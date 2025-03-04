import { z } from "zod";

const productValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  category: z.string(),
  image: z.string().url("Invalid image URL").optional(),
  rating: z.number().min(0).max(5).optional(),
});
const updateProductValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  stock: z
    .number()
    .int()
    .min(0, "Stock must be a non-negative integer")
    .optional(),
  category: z.string(),
  image: z.string().url("Invalid image URL").optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const productValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
