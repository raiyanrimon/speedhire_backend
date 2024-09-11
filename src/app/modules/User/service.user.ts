import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./interface.user";
import { User } from "./model.user";
import { createToken } from "../../utils/auth.utils";
import config from "../../config";
type TSigninUser = {
  email: string;
  password: string;
};

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  const result = await User.findById(user._id).select("-password");
  return result;
};

const signinUser = async (payload: TSigninUser) => {
  // checking if user exists
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return { user, token };
};

export const userServices = {
  createUserIntoDB,
  signinUser,
};
