import { Router } from "express";
import { userRoutes } from "../modules/users/user.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
