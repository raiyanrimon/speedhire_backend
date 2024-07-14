import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { carServices } from "./service.car";

const createACar = catchAsync(async (req, res) => {
  const result = await carServices.createACarIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});
const getAllCars = catchAsync(async (req, res) => {
  const result = await carServices.getAllCarFromBD();
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
    message: "Car retrieved successfully",
    data: result,
  });
});
const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await carServices.getSingleCarFromDB(id);
  if (!result) {
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
    message: "Car retrieved successfully",
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await carServices.updateSingleCarIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated successfully",
    data: result,
  });
});
const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await carServices.DeleteSingleCarFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car deleted successfully",
    data: result,
  });
});
export const carControllers = {
  createACar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
