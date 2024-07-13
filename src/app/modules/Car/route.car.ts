import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { carControllers } from "./controller.car";
import { CarValidationSchema } from "./validation.car";

const router = express.Router();

router.post(
  "/",
  validateRequest(CarValidationSchema.createCarValidationSchema),
  carControllers.createACar
);

router.get("/", carControllers.getAllCars);
router.get("/:id", carControllers.getSingleCar);

export const carRoutes = router;
