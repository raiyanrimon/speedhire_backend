import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { bookingControllers } from "./controller.booking";
import { BookingValidationSchema } from "./validation.booking";

const router = express.Router();
router.post(
  "/",
  auth("admin"),
  validateRequest(BookingValidationSchema.createBookingValidationSchema),
  bookingControllers.createBooking
);
router.get("/", bookingControllers.getAllBookings);
router.get("/my-bookings", auth("admin"), bookingControllers.getMyBookings);
export const bookingRoutes = router;
