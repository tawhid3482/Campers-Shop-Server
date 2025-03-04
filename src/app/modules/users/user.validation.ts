import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z
      .string()
      .regex(/^\d{10,15}$/, "Phone number must be 10-15 digits long"),
    address: z
      .object({
        street: z
          .string()
          .min(3, "Street must be at least 3 characters")
          .optional(),
        city: z
          .string()
          .min(2, "City must be at least 2 characters")
          .optional(),
        zip: z
          .string()
          .regex(/^\d{4,10}$/, "Invalid zip code")
          .optional(),
      })
      .optional(),
  }),
});
export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .optional(),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
    phone: z
      .string()
      .regex(/^\d{10,15}$/, "Phone number must be 10-15 digits long")
      .optional(),
    address: z
      .object({
        street: z
          .string()
          .min(3, "Street must be at least 3 characters")
          .optional(),
        city: z
          .string()
          .min(2, "City must be at least 2 characters")
          .optional(),
        zip: z
          .string()
          .regex(/^\d{4,10}$/, "Invalid zip code")
          .optional(),
      })
      .optional(),
  }),
});
export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
