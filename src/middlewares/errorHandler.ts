import { NextFunction, Request, Response } from "express";

import { AppError } from "../shared/errors/AppError";

export async function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "INTERNAL_SERVER_ERROR",
    message: `Internal server error - ${err.message}`,
  });
}
