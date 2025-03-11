import { Router } from "express";
import { userRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
