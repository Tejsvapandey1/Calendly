"use server";

import { currentUser } from "@clerk/nextjs/server";

import { prisma as db } from "@/lib/prisma";

export async function getUserAvailability() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // console.log(user.id);

  const existingUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
    include: {
      availability: {
        include: {
          days: true,
        },
      },
    },
  });

  if (!existingUser || !existingUser.availability) {
    return null;
  }

  const availabilityData = {
    timeGap: existingUser.availability.timeGap,
  };

  [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].forEach((day) => {
    const dayData = existingUser.availability.days.find(
      (d) => d.dayOfWeek === day.toUpperCase(),
    );
    if (dayData) {
      availabilityData[day] = {
        isAvailable: !!dayData,
        startTime: dayData
          ? dayData.startTime.toISOString().slice(11, 16)
          : "09:00",
        endTime: dayData
          ? dayData.endTime.toISOString().slice(11, 16)
          : "09:00",
      };
    } else {
      availabilityData[day] = {
        isAvailable: false,
        startTime: "09:00",
        endTime: "17:00",
      };
    }
  });

  return availabilityData;
}

export async function updateAvailability(data) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // console.log(Object.entries(data));

  const existingUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
    include: {
      availability: true,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const availabilityData = Object.entries(data).flatMap(
    ([day, { isAvailable, startTime, endTime }]) => {
      if (!isAvailable) return [];

      const baseDate = new Date().toISOString().split("T")[0];

      return [
        {
          day: day.charAt(0).toUpperCase() + day.slice(1), 
          startTime: new Date(`${baseDate}T${startTime}:00.000Z`),
          endTime: new Date(`${baseDate}T${endTime}:00.000Z`),
        },
      ];
    },
  );

  if (existingUser.availability) {
    await db.availability.update({
      where: {
        id: existingUser.availability.id,
      },
      data: {
        timeGap: data.timeGap,
        days: {
          deleteMany: {},
          create: availabilityData,
        },
      },
    });
  } else {
    await db.availability.create({
      data: {
        timeGap: data.timeGap,
        userId: existingUser.id,
        days: {
          create: availabilityData,
        },
      },
    });
  }

  return { success: true };
}
