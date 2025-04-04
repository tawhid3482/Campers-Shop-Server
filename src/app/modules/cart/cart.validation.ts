import { z } from "zod";

export const cartValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required").optional(), // Ensures a valid user ID
    items: z
      .array(
        z.object({
          product: z.string().min(1, "Product ID is required").optional(), // Ensures a valid product ID
          quantity: z.number().int().positive("Quantity must be at least 1").optional(), // Ensures quantity is a positive integer
          price: z.number().positive("Price must be a positive number").optional(), // Ensures price is a positive number
        }).optional()
      )
      .nonempty("Cart must have at least one item"), // Ensures the cart has items
    totalAmount: z
      .number()
      .nonnegative("Total amount must be 0 or more")
      .optional(), // `totalAmount` is optional since it's auto-calculated
  }),
});
export const updateCartValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required"), // Ensures a valid user ID
    items: z
      .array(
        z.object({
          product: z.string().min(1, "Product ID is required"), // Ensures a valid product ID
          quantity: z.number().int().positive("Quantity must be at least 1").optional(), // Ensures quantity is a positive integer
          price: z.number().positive("Price must be a positive number"), // Ensures price is a positive number
        })
      )
      .nonempty("Cart must have at least one item").optional(), // Ensures the cart has items
    totalAmount: z
      .number()
      .nonnegative("Total amount must be 0 or more")
      .optional(), // `totalAmount` is optional since it's auto-calculated
  }),
});

export const cartValidation = {
  cartValidationSchema,
  updateCartValidationSchema
};
