import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from 'jsonwebtoken';
import config from "../../../config/index.mjs";
import ApiError from "../../../errors/ApiError.mjs";
import isPasswordMatched from "../../shared/checkPassword.mjs";
import User from "../user/user.model.mjs";



const signUpUser = async (payload) => {
  const { fullName, email, password } = payload;
  
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password,10);
  const newUser = {
    fullName,
    email,
    password:hashedPassword ,
  };

  try {
    const savedUser = await User.create(newUser);
    return savedUser;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message);
  }
};

const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const isPasswordCorrect = await isPasswordMatched(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // const accessToken = jwtHelpers.createToken(
  //   { email: user.email },
  //   config.jwt.secret,
  //   config.jwt.expires_in
  // );

  const accessToken = jwt.sign({ email: user.email }, config.jwt.secret);

  const convertedUser = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName 
  }


  return {accessToken,convertedUser} ;
};


export const AuthService = {
  signUpUser,
  loginUser
};
