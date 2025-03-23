import { Router } from "express";
import { userRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { reviewRoute } from "../modules/reviews/reviews.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
