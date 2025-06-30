import "dotenv/config";
import express from "express";
import DBConnection from "./db/connect-db.js";
import { Request, Response, NextFunction } from "express";
import { authRouter } from "./routes/auth.route.js";
import { config } from "./config/config.js";
import CookieParser from "cookie-parser";

const app = express();
DBConnection();
app.use(express.json({ limit: "16mb" }));
app.use(CookieParser());

app.get("/name", (req: Request, res: Response) => {
  res.status(200).json({
    name: "Mussaddiq",
  });
});

app.use(`${config.V1_URL}/auth`, authRouter);
app.use(`${config.V1_URL}/user`, authRouter);

app.use(
  (
    err: { status?: number; message?: string },
    _: Request,
    res: Response,
    _next: NextFunction
  ) => {
    res.status(err.status ?? 500).json({
      message: err.message ?? "Something went wrong",
      status: err.status ?? 500,
    });
  }
);

app.listen(config.PORT, () => {
  console.log("server is runing on port : ",config.PORT);
});
