import { Router } from "express";
import { userRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { reviewRoute } from "../modules/reviews/reviews.route";
import { orderRoute } from "../modules/orders/order.route";
import { productRoute } from "../modules/Products/product.route";
import { categoryRoute } from "../modules/Categories/categories.route";
import { cartRoute } from "../modules/cart/cart.route";

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
    path: "/",
    route: reviewRoute,
  },
  {
    path: "/",
    route: productRoute,
  },
  {
    path: "/",
    route: categoryRoute,
  },
  {
    path: "/",
    route: cartRoute,
  },
  {
    path: "/",
    route: orderRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
