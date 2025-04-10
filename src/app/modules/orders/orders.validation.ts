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
    orderStatus: z
      .enum(["Pending", "Success", "Failed"], {
        errorMap: () => {
          return {
            message: "Status must be 'Pending', 'Success', or 'Failed'",
          };
        },
      })
      .default("Pending"),
    shippingAddress: z.object({
      name: z.string().min(1, "Name is required"),
      address: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      phone: z.string().min(1, "Phone number is required"), // Adjust phone format validation as needed
      zipCode: z.string().min(1, "Zip code is required"),
    }),
  }),
});

export const orderValidation = {
  orderValidationSchema,
};
