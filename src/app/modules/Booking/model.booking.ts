import { Schema, model } from "mongoose";
import { TBooking } from "./interface.booking";

const bookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: "null" },
    totalCost: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
