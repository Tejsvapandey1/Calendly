"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Delete } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { deleteEvent } from "@/actions/event";

const EventCard = ({ event, username, isPublic = false }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`,
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy link:", e);
    }
  };

  const { error, loading, fn: fnDelete } = useFetch(deleteEvent);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await fnDelete(event.id);
      window.location.reload();
    }
  }

  return (
    <Card className={"flex flex-col justify-between cursor-pointer"}>
      <CardHeader>
        <CardTitle className={"text-2xl"}>{event.title}</CardTitle>
        <CardDescription className={"flex justify-between"}>
          <span>
            {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
          </span>

          <span>{event._count.bookings} Bookings</span>
        </CardDescription>
        <CardContent>
          <p>
            {event.description.substring(0, event.description.indexOf("."))}
          </p>
        </CardContent>

        {!isPublic && (
          <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
            This event is private. Only you can view the details.
          </div>
        )}
      </CardHeader>
      <CardFooter className={"flex justify-around"}>
        <Button
          className={"flex items-center gap-2"}
          variant="outline"
          onClick={handleCopy}
        >
          <Copy /> {isCopied ? "Link Copied!" : "Copy Link"}
        </Button>
        <Button
          variant="destructive"
          className={"flex items-center gap-2"}
          disabled={loading}
          onClick={handleDelete}
        >
          <Delete /> {loading ? "Deleting..." : "Delete Event"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
