import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ErrorHandler } from "../errors/handler/errorHandler.error";

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errorHandler = container.resolve(ErrorHandler);
  errorHandler.handleExpressError(err, res);
}
