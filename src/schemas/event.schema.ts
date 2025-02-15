import { z } from "zod";

export const eventSchema = z.object({
  name: z
    .string()
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name cannot exceed 100 characters"),
  date: z.string().refine((date) => {
    const eventDate = new Date(date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return eventDate >= now;
  }, "Event date cannot be in the past"),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location cannot exceed 200 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  status: z.enum(["pending", "completed"]).default("pending"),
});

export type EventFormData = z.infer<typeof eventSchema>;