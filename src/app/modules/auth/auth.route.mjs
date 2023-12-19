import express from 'express';
import validateRequest from '../../middlewares/validateRequest.mjs';
import { UserValidation } from '../user/user.validation.mjs';
import { AuthController } from './auth.controller.mjs';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.signUpUserController
);

router.post('/login',
validateRequest(UserValidation.loginUserZodSchema),
AuthController.loginUserController)


export const AuthRoutes = router;