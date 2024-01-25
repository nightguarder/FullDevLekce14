import { Request, Response, NextFunction } from "express";

//Error exception Middleware
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const statusCode = err?.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "An unknown error occurred",
    status: statusCode,
    stack: process.env.ENV === "development" ? err.stack : undefined,
  });
}
