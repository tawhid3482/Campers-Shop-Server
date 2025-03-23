import express from "express";
import validationRequest from "../../middlewares/ValidationRequest";
import { reviewsValidation } from "./reviews.validation";
import auth from "../../middlewares/auth";
import { ReviewsControllers } from "./reviews.controller";
const router = express.Router();
router.post(
  "/reviews",
  validationRequest(reviewsValidation.reviewValidationSchema)
);

router.post(
  "/reviews",
  validationRequest(reviewsValidation.reviewValidationSchema),
  ReviewsControllers.createReviews
);
router.get("/reviews", ReviewsControllers.getAllReviews);
router.get("/reviews", ReviewsControllers.getSingleReviews);
router.put("/reviews", ReviewsControllers.updateReviews);
router.delete(
  "/reviews",
  auth("ADMIN", "SUPER_ADMIN"),
  ReviewsControllers.deleteReviews
);

export const reviewRoute = router;
