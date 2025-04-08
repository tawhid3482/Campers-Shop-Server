import { z } from "zod";

export const paymentValidationSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: "User ID is required",
    }),
    orderId: z.string({
      required_error: "Order ID is required",
    }),
    paymentMethod: z.enum(["Cash", "Card"], {
      errorMap: () => {
        return { message: "Payment method must be either 'Cash' or 'Card'" };
      },
    }),
    status: z
      .enum(["Pending", "Success", "Failed"], {
        errorMap: () => {
          return {
            message: "Status must be 'Pending', 'Success', or 'Failed'",
          };
        },
      })
      .optional()
      .default("Pending"),

    amount: z
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .positive("Amount must be a positive number"),
  }),
});

// Export the validator
export const paymentValidation = {
  paymentValidationSchema,
};
