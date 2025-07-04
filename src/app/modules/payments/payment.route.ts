import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { paymentValidation } from "./payment.validation";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post(
  "/create-ssl-payment",
  validationRequest(paymentValidation.paymentValidationSchema),
  PaymentControllers.createPayment
);

router.post("/success-payment", PaymentControllers.paymentSuccess);

router.get(
  "/payment",
  //  auth("ADMIN", "SUPER_ADMIN", "CUSTOMER"),
  PaymentControllers.getAllPayment
);

router.get(
  "/payment/:email",
  PaymentControllers.getSinglePaymentByEmail
);

router.get(
  "/payment/:id",
  // auth("ADMIN", "SUPER_ADMIN", "CUSTOMER"),
  PaymentControllers.getSinglePayment
);



router.put(
  "/payment",
  auth("ADMIN", "SUPER_ADMIN"),
  PaymentControllers.updatePayment
);
router.delete(
  "/payment::email",
  auth("ADMIN", "SUPER_ADMIN"),
  PaymentControllers.deletePayment
);

export const paymentRoute = router;
