"use server";
import { eventsSchema } from "@/app/lib/validator";
import { prisma as db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const CreateEvent = async (data) => {
  const { userId } = await auth();
  console.log(userId);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validateData = eventsSchema.parse(data);
  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
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

export default CreateEvent;
