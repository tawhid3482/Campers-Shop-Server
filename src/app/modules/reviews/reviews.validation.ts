import { z } from "zod";

const reviewValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    userEmail: z.string().email("Invalid email address"),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: z.string().min(5, "Comment must be at least 5 characters long"),
  }),
});
const updateReviewValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    userEmail: z.string().email("Invalid email address"),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: z.string().min(5, "Comment must be at least 5 characters long"),
  }),
});

export const reviewsValidation = {
  reviewValidationSchema,
  updateReviewValidationSchema,
};
