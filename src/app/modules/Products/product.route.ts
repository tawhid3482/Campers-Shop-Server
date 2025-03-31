import express from "express";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/ValidationRequest";
import { productValidation } from "./product.validation";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post(
  "/products",
  // auth("ADMIN", "SUPER_ADMIN"),
  validationRequest(productValidation.productValidationSchema),
  productControllers.createProduct
);
router.get("/products", productControllers.getAllProduct);
router.get(
  "/products/:id",
  // auth("ADMIN", "SUPER_ADMIN", "CUSTOMER"),
  productControllers.getSingleProduct
);
router.put(
  "/products",
  auth("ADMIN", "SUPER_ADMIN"),
  productControllers.updateProduct
);
router.delete(
  "/products",
  auth("ADMIN", "SUPER_ADMIN"),
  productControllers.deleteProduct
);
export const productRoute = router;
