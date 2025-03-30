import { z } from "zod";

 const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Category name is required"), // Ensures the name is not empty
    // image: z.string().url("Invalid image URL").optional(), // Validates if provided
  }),
});
 const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Category name is required").optional(), // Ensures the name is not empty
    image: z.string().url("Invalid image URL").optional(), // Validates if provided
  }),
});


export const categoryValidation = {
    categoryValidationSchema,
    updateCategoryValidationSchema
}