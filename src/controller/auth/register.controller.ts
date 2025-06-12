import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { APIResponse } from "../../lib/apiResponse.js";
import { validateData } from "../../lib/validateData.js";
import { PreRegisterUser, User } from "../../models/user.model.js";
import { ErrorResponse } from "../../lib/errorResponse.js";

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | undefined;
  password: string;
}

export const RegisterUserController = asyncHandler(
  async (req: Request, res: Response) => {
    validateData(req.body, ["firstName", "lastName", "email", "password"]);
    const body = req.body as RegisterProps;
    const { email } = body;
    const lowerEmail = email.toLocaleLowerCase();
    const user = await User.find({ email: lowerEmail });
    console.log("user : ", user);
    if (user[0]) {
      throw new ErrorResponse(400, "User already exist");
    }

    const newUser = await PreRegisterUser.create({
      ...body,
      email: lowerEmail,
    });
    const { email: userEmail, verifyToken } = newUser;

    res
      .status(200)
      .json(
        new APIResponse(
          200,
          "User Created, Verification Email sended to your email",
          { email: userEmail, verifyToken }
        )
      );
  }
);
