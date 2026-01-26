const { prisma: db } = require("@/lib/prisma");
const { clerkClient } = require("@clerk/nextjs/server");
const { google } = require("googleapis");

export const createBooking = async (bookingData) => {
  try {
    const event = await db.event.findUnique({
      where: {
        id: bookingData.eventid,
      },
      include: {
        user: true,
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    const { data } = clerkClient.users.getUserOauthAccessToken(
      event.user.clerkUserId,
      "oauth_google",
    );

    const token = data[0]?.token;

    if (!token) {
      throw new Error("Event creator has not connected Google Calendar");
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Create Google Meet link
    const meetResponse = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${bookingData.name} - ${event.title}`,
        description: bookingData.additionalInfo,
        start: { dateTime: bookingData.startTime },
        end: { dateTime: bookingData.endTime },
        attendees: [{ email: bookingData.email }, { email: event.user.email }],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });

    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;

    // Create booking in database
    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    return { success: true, booking, meetLink };
  } catch (e) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
};
