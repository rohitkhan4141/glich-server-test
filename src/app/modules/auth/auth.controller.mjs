import httpStatus from 'http-status';
import { AuthService } from './auth.service.mjs';


const signUpUserController = async (req, res) => {
  try {
    const result = await AuthService.signUpUser(req.body);
    console.log(result);
    res.status(httpStatus.OK).json({
      message: "User Created Successfully",
      user: result,
    });
  } catch (error) {
    if (error.statusCode && error.message) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
};

const loginUserController = async (req, res) => {
  try {
    const result = await AuthService.loginUser(req.body);
    res.status(httpStatus.OK).json({
      message: "login Successfully",
      jwt: result.accessToken,
      user: result.convertedUser
    });
  } catch (error) {
    if (error.statusCode && error.message) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
};


export const AuthController = {
    signUpUserController,
    loginUserController
};