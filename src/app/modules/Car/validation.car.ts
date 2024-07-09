import { z } from "zod";

export const carZodSchema = z.object({
  name: z.string().min(1, "Car name is required"),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "Color is required"),
  isElectric: z.boolean(),
  status: z.enum(["available", "unavailable"]).default("available"),
  features: z.array(z.string()).nonempty("Features are required"),
  pricePerHour: z.number().positive("Price per hour must be a positive number"),
  isDeleted: z.boolean().default(false),
});
