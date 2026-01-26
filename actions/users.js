"use server";

import { prisma as db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUsername(username) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existingUsername = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUsername) {
    throw new Error("Username already taken");
  }

  console.log(existingUsername)

  await db.user.update({
    where: {
      clerkUserId: userId,
    },
    data: {
      username: username,
    },
  });

  const client = await clerkClient();
  await client.users.updateUser(userId, {
    username: username,
  });

  return { success: true };
}

export async function getUserByUsername(username) {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      events: {
        where: {
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          duration: true,
          description: true,
          isPrivate: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      },
    },
  });

  return user;
}
