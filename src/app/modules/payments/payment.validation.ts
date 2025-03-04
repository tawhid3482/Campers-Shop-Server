import { z } from "zod";

export const paymentValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    orderId: z.string(),
    paymentMethod: z.enum(["Cash", "Card"], {
      errorMap: () => {
        return { message: "Payment method must be either 'Cash' or 'Card'" };
      },
    }),
    transactionId: z.string().min(1, "Transaction ID is required"),
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
    amount: z.number().positive("Amount must be a positive number"),
  }),
});

// Validation function
export const paymentValidation = {
    paymentValidationSchema,
};
