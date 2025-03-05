import express from "express";
import { userController } from "./user.controller";
import validationRequest from "../../middlewares/ValidationRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/users",
  validationRequest(userValidation.createUserValidationSchema),
  userController.createUser
);
router.post(
  "/admin",
  validationRequest(userValidation.createUserValidationSchema),
  userController.createAdmin
);

export const userRoutes = router;
