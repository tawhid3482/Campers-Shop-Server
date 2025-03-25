import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { paymentValidation } from "./payment.validation";


const router = express.Router();

router.post(
  "/payment",
  validationRequest(paymentValidation.paymentValidationSchema),
  paymentController.createPayment
);
router.get("/payment", paymentControllers.getAllPayment);
router.get(
  "/payment",
  auth("ADMIN", "SUPER_ADMIN", "CUSTOMER"),
  paymentControllers.getSinglePayment
);
router.put(
  "/payment",
  auth("ADMIN", "SUPER_ADMIN"),
  paymentControllers.updatePayment
);
router.delete(
  "/payment",
  auth("ADMIN", "SUPER_ADMIN"),
  paymentControllers.deletePayment
);

export const paymentRoute = router;
