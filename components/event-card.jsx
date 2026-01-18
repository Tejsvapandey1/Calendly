import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const EventCard = ({ event, username,isPublic = false }) => {
  return (
    <Card className={"flex flex-col justify-between cursor-pointer"}>
      <CardHeader>
        <CardTitle className={"text-2xl"}>{event.title}</CardTitle>
        <CardDescription className={"flex justify-between"}>
            <span>
              {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
            </span>

            <span>
                {event._count.bookings} Bookings
            </span>
        </CardDescription>
        <CardContent>
            <p>{event.description.substring(0,event.description.indexOf("."))}</p>
        </CardContent>

        {!isPublic && (
            <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
              This event is private. Only you can view the details.
            </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default EventCard;
