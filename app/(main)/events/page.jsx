import { getUserEvents } from "@/actions/event";
import EventCard from "@/components/event-card";

import React, { Suspense } from "react";

export default function EventsPage(params) {
  return (
    <Suspense fallback={<h3>Loading Ui</h3>}>
      <Events />
    </Suspense>
  );
}

const Events = async () => {
  const { events, username } = await getUserEvents();
  if (events.length === 0) {
    return <p>You haven&apos;t created any events yet.</p>;
  }
  console.log(events)
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {events?.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  );
};
