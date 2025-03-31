import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { categoryValidation } from "./categories.validation";
import { CategoryControllers } from "./categories.controller";

const router = express.Router();

router.post(
  "/categories",
  // auth("ADMIN", "SUPER_ADMIN"),
  validationRequest(categoryValidation.categoryValidationSchema),
  CategoryControllers.createCategory
);
router.get("/categories", CategoryControllers.getAllCategory);
router.get(
  "/categories/:id",
  CategoryControllers.getSingleCategory
);
router.put(
  "/categories/:id",
  auth("ADMIN", "SUPER_ADMIN"),
  CategoryControllers.updateCategory
);
router.delete(
  "/categories/:id",
  auth("ADMIN", "SUPER_ADMIN"),
  CategoryControllers.deleteCategory
);

export const categoryRoute = router;
