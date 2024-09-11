import { Router } from "express";
import { UserRoutes } from "../modules/User/route.user";
import { carRoutes } from "../modules/Car/route.car";
import { bookingRoutes } from "../modules/Booking/route.booking";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/cars",
    route: carRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
