import express, { Request, Response } from "express";
import { APIResponse } from "../lib/apiResponse.js";
import { VerifyAccessTokenMiddleware } from "../middleware/verify-access-token.middleware.js";
import { GetProfileController } from "../controller/user/profile.controller.js";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.status(200).json(new APIResponse(200, "auth service is working", {}));
});
router.get("/profile", VerifyAccessTokenMiddleware, GetProfileController);
router.post("/profile", VerifyAccessTokenMiddleware, GetProfileController);

export const userRouter = router;
