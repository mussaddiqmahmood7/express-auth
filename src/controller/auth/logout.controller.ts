import { Request, Response } from "express";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { APIResponse } from "../../lib/apiResponse.js";

export const LogoutController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body.user;
    user.refreshToken = null;
    await user.save();
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new APIResponse(200, "logout successfully"));
  }
);
