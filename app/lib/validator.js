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

export const daySchema = z.object({
  isAvailable: z.boolean(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format").optional(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format").optional(),
}).refine((data) => {
  return data.startTime && data.endTime ? data.startTime < data.endTime : true;
},{
  message: "Start time must be before end time",
})

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0).max(120),
});