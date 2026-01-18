import { z } from "zod";
export const usernameSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

})

export const eventsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be at most 100 characters"),
  description: z.string().max(500, "Description must be at most 500 characters").optional(),
  duration: z.number().min(15, "Duration must be at least 15 minutes").max(240, "Duration must be at most 240 minutes"),  

  isPrivate: z.boolean().optional(),
})