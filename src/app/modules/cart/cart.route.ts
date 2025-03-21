import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { categoryValidation } from "../Categories/categories.validation";
import { CategoryControllers } from "../Categories/categories.controller";



const router = express.Router();

router.post(
  "/cart",
  auth("ADMIN", "SUPER_ADMIN"),
  validationRequest(categoryValidation.categoryValidationSchema),
  CategoryControllers.createCategory
);
router.get("/cart", CategoryControllers.getAllCategory);
router.get(
  "/cart",
  auth("ADMIN", "SUPER_ADMIN", "CUSTOMER"),
  CategoryControllers.getSingleCategory
);
router.put(
  "/cart",
  auth("ADMIN", "SUPER_ADMIN"),
  CategoryControllers.updateCategory
);
router.delete(
  "/cart",
  auth("ADMIN", "SUPER_ADMIN"),
  CategoryControllers.deleteCategory
);
