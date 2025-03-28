import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { paymentValidation } from "./payment.validation";
import { PaymentControllers } from "./payment.controller";


const router = express.Router();

router.post(
  "/payment",
  validationRequest(paymentValidation.paymentValidationSchema),
  PaymentControllers.createPayment
);
router.get("/payment", PaymentControllers.getAllPayment);
router.get(
  "/payment",
  auth("ADMIN", "SUPER_ADMIN", "CUSTOMER"),
  PaymentControllers.getSinglePayment
);
router.put(
  "/payment",
  auth("ADMIN", "SUPER_ADMIN"),
  PaymentControllers.updatePayment
);
router.delete(
  "/payment",
  auth("ADMIN", "SUPER_ADMIN"),
  PaymentControllers.deletePayment
);

export const paymentRoute = router;
