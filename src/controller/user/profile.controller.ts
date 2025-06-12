import { Request, Response } from "express";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { ErrorResponse } from "../../lib/errorResponse.js";
import { User } from "../../models/user.model.js";
import { APIResponse } from "../../lib/apiResponse.js";

export const ProfileController = asyncHandler(async (req: Request, res: Response) => {
  const user = req.body.user;
  if (!user) {
    throw new ErrorResponse(403, "you are not authorized");
  }

  const returnUser = await User.findById(user._id).select(
    "-password -__v -forgotToken"
  );

  res
    .status(200)
    .json(
      new APIResponse(200, "Profile data fetched successfully", returnUser)
    );
});
