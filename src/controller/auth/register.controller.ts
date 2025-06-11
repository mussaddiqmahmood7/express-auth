import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { APIResponse } from "../../lib/apiResponse.js";
import { validateData } from "../../lib/validateData.js";
import { PreRegisterUser, User } from "../../models/user.model.js";
import { ErrorResponse } from "../../lib/errorResponse.js";

interface RegisterProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | undefined;
  password: string;
}

export const RegisterUser = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body as RegisterProps;
    validateData(body, ["first_name", "last_name", "email", "password"]);
    const { email } = body;

    const user = await User.find({ email: email.toLocaleLowerCase() });
    console.log("user : ", user);
    if (user[0]) {
      throw new ErrorResponse(400, "User already exist");
    }

    const newUser = await PreRegisterUser.create({ ...body });
    const { email: userEmail, verifyToken } = newUser;

    res
      .status(200)
      .json(
        new APIResponse(
          200,
          "User Created, Verification Email sended to your email",
          {email:userEmail, verifyToken}
        )
      );
  }
);
