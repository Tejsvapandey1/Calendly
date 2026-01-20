import { currentUser } from "@clerk/nextjs/server";

import { prisma as db } from "@/lib/prisma";

export async function getUserAvailability() {
  const user = await currentUser();
  

  if (!user) {
    throw new Error("Unauthorized");
  }

  console.log(user.id)

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
