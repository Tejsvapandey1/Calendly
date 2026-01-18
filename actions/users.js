"use server"

import { prisma as db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function updateUsername(username){
    const {userId} = await auth();

    if(!userId){
        throw new Error("User not authenticated");
    } 

    const existingUsername = await db.user.findUnique({
        where: {
            username: username
        }
    });

    if(existingUsername){
        throw new Error("Username already taken");
    }

    await db.user.update({
        where: {
            clerkUserId: userId
        },
        data: {
            username: username
        }
    });

  const client = await clerkClient();
    await client.users.updateUser(userId, {
        username: username
    });

    return {success : true};
}