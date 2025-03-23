import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { orderValidation } from "./orders.validation";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/orders",
  auth("ADMIN", "SUPER_ADMIN"),
  validationRequest(orderValidation.orderValidationSchema),
  OrderControllers.createOrder
);
router.get("/orders", OrderControllers.getAllOrder);
router.get(
  "/orders",
  auth("ADMIN", "SUPER_ADMIN", "CUSTOMER"),
  OrderControllers.getSingleOrder
);
router.put(
  "/orders",
  auth("ADMIN", "SUPER_ADMIN"),
  OrderControllers.updateOrder
);
router.delete(
  "/orders",
  auth("ADMIN", "SUPER_ADMIN"),
  OrderControllers.deleteOrder
);
export const orderRoute = router;
