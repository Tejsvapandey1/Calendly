"use server";
import { eventsSchema } from "@/app/lib/validator";
import { prisma as db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

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

  console.log(user.id)

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
    throw new Error("Event not found or you do not have permission to delete this event");
  }

  await db.event.delete({
    where: { id: eventId },
  });

  return { success: true };
}

export default CreateEvent;
