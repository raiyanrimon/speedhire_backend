import { Types } from "mongoose";

export interface TBooking {
  date: string;
  userId: Types.ObjectId;
  carId: Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost?: number;
}
