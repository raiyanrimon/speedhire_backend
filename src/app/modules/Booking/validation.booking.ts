import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string().min(1, "Car ID is required"),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    startTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:MM format"
      ),
  }),
});

const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string().min(1, "End time is required"),
  }),
});

export const BookingValidationSchema = {
  createBookingValidationSchema,
  returnCarValidationSchema,
};
