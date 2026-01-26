"use server";
import { eventsSchema } from "@/app/lib/validator";
import { prisma as db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { addDays, parseISO, startOfDay, format ,isBefore, addMinutes} from "date-fns";

const CreateEvent = async (data) => {
  const user = await currentUser();
  console.log(user.id);

  if (!user) {
    throw new Error("Unauthorized");
  }

  const validateData = eventsSchema.parse(data);
  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const event = await db.event.create({
    data: {
      ...validateData,
      userId: existingUser.id,
    },
  });

  console.log("Created event:", event);

  return event;
};

export const getUserEvents = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  console.log(user.id);

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const events = await db.event.findMany({
    where: { userId: existingUser.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { bookings: true } },
    },
  });

  return { events, username: existingUser.username };
};

export const deleteEvent = async (eventId) => {
  const user = await currentUser();
  console.log("Deleting event for user:", user);

  if (!user) {
    throw new Error("Unauthorized");
  }
  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.userId !== existingUser.id) {
    throw new Error(
      "Event not found or you do not have permission to delete this event",
    );
  }

  await db.event.delete({
    where: { id: eventId },
  });

  return { success: true };
};

export const getEventDetails = async (username, eventId) => {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: { username: username },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
          username: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

export const getEventAvailability = async (eventId) => {
  console.log("got in the event")
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  if (!event || !event.user.availability) {
    return [];
  }

  console.log("this is from getEventAvailability event",event);

  const { availability, bookings } = event.user;

  console.log("this is availability \n", availability);

  const startDate = startOfDay(new Date());
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);

  const availableDates = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dayOfWeek = format(date, "EEEE"); // ✅ matches enum

    const dayAvailability = availability.days.find((d) => d.day === dayOfWeek);

    if (dayAvailability) {
      const dateStr = format(date, "yyyy-MM-dd");

      const slots = generateAvailableSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        dateStr,
        availability.timeGap,
      );

      availableDates.push({
        date: dateStr,
        slots,
      });
    }
  }

  console.log("this is what i am sending", availableDates);

  return { availableDates };
};

function generateAvailableSlots(
  startTime,
  endTime,
  duration,
  bookings,
  dateStr,
  timeGap,
) {
  const slots = [];

  let currentTime = parseISO(
    `${dateStr}T${startTime.toISOString().slice(11, 16)}`,
  );

  const slotEndTime = parseISO(
    `${dateStr}T${endTime.toISOString().slice(11, 16)}`,
  );

  const now = new Date();

  if (format(currentTime, "yyyy-MM-dd") === dateStr) {
    if (isBefore(currentTime, now)) {
      currentTime = addMinutes(now, timeGap);
    }
  }

  while (currentTime < slotEndTime) {
    const slotEnd = addMinutes(currentTime, duration);

    if (slotEnd > slotEndTime) break;

    const isSlotAvailable = !bookings.some((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);

      return currentTime < bookingEnd && slotEnd > bookingStart;
    });

    if (isSlotAvailable) {
      slots.push(format(currentTime, "HH:mm"));
    }

    currentTime = slotEnd;
  }
  return slots;
}

export default CreateEvent;
