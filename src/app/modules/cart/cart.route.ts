import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { categoryValidation } from "../Categories/categories.validation";
import { CategoryControllers } from "../Categories/categories.controller";
import { cartValidation } from "./cart.validation";
import { CartControllers } from "./cart.controller";

const router = express.Router();

router.post(
  "/cart",
  validationRequest(cartValidation.cartValidationSchema),
  CartControllers.createCart
);
router.get("/cart", CartControllers.getAllCart);

router.get(
  "/cart/:email",
  CartControllers.getSingleCart
);

router.put(
  "/cart",
  auth("ADMIN", "SUPER_ADMIN"),
  CategoryControllers.updateCategory
);
router.delete(
  "/cart/:id",
  // auth("ADMIN", "SUPER_ADMIN",'CUSTOMER'),
  CartControllers.deleteCart
);
export const cartRoute = router;
