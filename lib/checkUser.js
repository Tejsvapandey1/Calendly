import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { prisma as db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const firstName = user.firstName ?? "";
    const lastName = user.lastName ?? "";

    const name = `${firstName} ${lastName}`.trim();

    const client = await clerkClient();
    await client.users.updateUser(user.id, {
      username: name.split(" ").join("-") + user.id.slice(-4),
    });

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username: name.split(" ").join("-") + user.id.slice(-4),
      },
    });

    return newUser;
  } catch (err) {
    console.log(err);
  }
};
