import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./service.booking";
import { User } from "../User/model.user";
import AppError from "../../error/AppError";

const createBooking = catchAsync(async (req, res) => {
  const email = req.user?.email;
  if (!email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await bookingServices.createBookingIntoDB({
    ...req.body,
    userId: user._id,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Car booked successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBooking();
  if (result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings Retrieved Successfully",
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await bookingServices.returnCarToDB({
    bookingId,
    endTime,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car returned successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const email = req.user?.email;
  if (!email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await bookingServices.getUserBookingsFromDB(
    user._id.toString()
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBookings,
  returnCar,
  getMyBookings,
};
