import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { carControllers } from "./controller.car";
import { CarValidationSchema } from "./validation.car";
import auth from "../../middlewares/auth";
import { bookingControllers } from "../Booking/controller.booking";
import { BookingValidationSchema } from "../Booking/validation.booking";

const router = express.Router();

router.post(
  "/",
  validateRequest(CarValidationSchema.createCarValidationSchema),
  auth("admin"),
  carControllers.createACar
);

router.get("/", carControllers.getAllCars);
router.get("/:id", carControllers.getSingleCar);
router.put(
  "/return",
  auth("admin"),
  validateRequest(BookingValidationSchema.returnCarValidationSchema),
  bookingControllers.returnCar
);
router.put(
  "/:id",
  validateRequest(CarValidationSchema.updateCarValidationSchema),
  auth("admin"),
  carControllers.updateCar
);
router.delete("/:id", auth("admin"), carControllers.deleteCar);

export const carRoutes = router;
