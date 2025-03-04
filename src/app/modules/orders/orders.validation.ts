import { z } from "zod";

 const orderValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required"), // MongoDB ObjectId is a string
    items: z
      .array(
        z.object({
          product: z.string().min(1, "Product ID is required"), // Product reference
          quantity: z
            .number()
            .int()
            .positive("Quantity must be a positive integer"),
          price: z.number().positive("Price must be a positive number"),
        })
      )
      .nonempty("At least one item is required"),
    totalAmount: z.number().positive("Total amount must be a positive number"),
    status: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
    paymentMethod: z.enum(["Cash", "Card"]),
  }),
});


export const orderValidation = {
  orderValidationSchema
}