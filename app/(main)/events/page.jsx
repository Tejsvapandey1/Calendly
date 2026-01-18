import { getUserEvents } from "@/actions/event";

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
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {events?.map((event) => (
        // <EventCard key={event.id} event={event} username={username} />
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
      Hello
    </div>
  );
};
