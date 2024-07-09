import { z } from "zod";

export const bookingZodSchema = z.object({
  date: z.date(),
  user: z.string().nonempty("User reference is required"),
  car: z.string().nonempty("Car reference is required"),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
  totalCost: z.number().default(0),
});
