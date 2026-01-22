import { getEventDetails } from "@/actions/event";
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

  if (!event) {
    notFound();
  }
  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
};

export default EventPage;
