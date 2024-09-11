import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Car } from "../Car/model.car";
import { TBooking } from "./interface.booking";
import { Booking } from "./model.booking";
import { TCar } from "../Car/interface.car";

const createBookingIntoDB = async (payload: TBooking) => {
  // checking is car available?
  const isCarAvailable = await Car.findById(payload.carId);
  if (
    !isCarAvailable ||
    isCarAvailable.isDeleted ||
    isCarAvailable.status === "unavailable"
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "car is not available for booking"
    );
  }

  // create booking
  const result = await Booking.create(payload);
  // update car status to unavailable
  isCarAvailable.status = "unavailable";
  // saving into database
  isCarAvailable.save();

  await (await result.populate("userId")).populate("carId");
  return result;
};

const getAllBooking = async () => {
  const result = await Booking.find();
  return result;
};

const returnCarToDB = async (payload: {
  bookingId: string;
  endTime: string;
}) => {
  // Fetch the booking and populate userId and carId
  const booking = await Booking.findById(payload.bookingId)
    .populate("userId")
    .populate("carId");

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const car = booking.carId as unknown as TCar;
  if (!car || car.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Car details not found or car is unavailable"
    );
  }

  const startTime = new Date(`${booking.date}T${booking.startTime}:00`);
  const endTime = new Date(`${booking.date}T${payload.endTime}:00`);
  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  const totalCost = durationInHours * car.pricePerHour;

  // Update booking with end time and total cost
  booking.endTime = payload.endTime;
  booking.totalCost = totalCost;
  await booking.save();

  // Update car status to available
  car.status = "available";
  await car.save();

  return booking;
};

const getUserBookingsFromDB = async (userId: string): Promise<TBooking[]> => {
  const result = await Booking.find({ userId })
    .populate("userId")
    .populate("carId");

  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBooking,
  returnCarToDB,
  getUserBookingsFromDB,
};
