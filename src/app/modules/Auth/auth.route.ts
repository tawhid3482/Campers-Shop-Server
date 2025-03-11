import express from 'express';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import validationRequest from '../../middlewares/ValidationRequest';
import auth from '../../middlewares/auth';
import { User_Role } from '../users/user.constant';


const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(
      User_Role.CUSTOMER,
      User_Role.ADMIN,
      User_Role.SUPER_ADMIN,
  ),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
