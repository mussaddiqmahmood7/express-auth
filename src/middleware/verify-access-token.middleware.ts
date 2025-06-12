import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import { ErrorResponse } from "../lib/errorResponse.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { User } from "../models/user.model.js";

export const VerifyAccessTokenMiddleware = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const accessToken =
      req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!accessToken) {
      throw new ErrorResponse(403, "you are not authorized");
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, config.AccessTokenSecret) as {
        _id: string | undefined;
      };
    } catch (err) {
      throw new ErrorResponse(403, "Invalid or expired refresh token");
    }

    if (!decoded._id) {
      throw new ErrorResponse(403, "Invalid authorized token");
    }

    const user = await User.findById(decoded._id).select(
      "-password -__v -frogotToken"
    );

    if (!user) {
      throw new ErrorResponse(404, "User not found");
    }

    if (!user.refreshToken) {
      throw new ErrorResponse(404, "you are not authorized");
    }

    req.body.user = user;

    next();
  }
);
