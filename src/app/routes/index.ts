import { Router } from "express";
import { UserRoutes } from "../modules/User/route.user";
import { carRoutes } from "../modules/Car/route.car";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
