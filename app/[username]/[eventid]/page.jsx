import { getEventAvailability, getEventDetails } from "@/actions/event";
import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";

export async function generateMetadata({ params }) {
  const userFromParams = await params;
  const event = await getEventDetails(
    userFromParams.username,
    userFromParams.eventid,
  );

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.user.name}'s Profile | Your App Name`,
    description: `Book an event with ${event.user.name}. View available public events and schedules.`,
  };
}

const EventPage = async ({ params }) => {
  const userFromParams = await params;

  const event = await getEventDetails(
    userFromParams.username,
    userFromParams.eventid,
  );

  const availability = await getEventAvailability(userFromParams.eventid);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex justify-center content-center px-4 py-10 bg-gray-50 mt-4">
      <div className="w-80 max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <EventDetails event={event} />
          <Suspense fallback={<div>Loading booking form...</div>}>
            <BookingForm event={event} availability={availability} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
