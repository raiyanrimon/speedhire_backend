import express from "express";
import { userControllers } from "./controller.user";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./validation.user";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  userControllers.signup
);
router.post("/signin", userControllers.signin);

export const UserRoutes = router;
