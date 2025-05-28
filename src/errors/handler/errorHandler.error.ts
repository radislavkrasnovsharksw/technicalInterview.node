import { injectable, inject } from "tsyringe";
import { Response } from "express";
import { HttpError } from "../httpError.error";
import { ILogger } from "../../interfaces/logger/interface.interface";
import { config } from "../../config";

@injectable()
export class ErrorHandler {
  constructor(@inject("Logger") private logger: ILogger) {}

  public handleExpressError(err: Error, res: Response): void {
    if (this.isTrustedError(err) && err instanceof HttpError) {
      this.logger.warn(`Operational Error: ${err.statusCode} - ${err.message}`);
      res.status(err.statusCode).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.message
      });
    } else {
      this.logger.error("Unexpected API Error:", err);

      const statusCode = (err as any).statusCode || 500;
      const message =
        config.nodeEnv === "development" || err instanceof HttpError
          ? err.message
          : "An unexpected internal server error occurred.";

      res.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message: message,
        ...(config.nodeEnv === "development" && { stack: err.stack })
      });
    }
  }

  public handleGlobalError(
    error: Error,
    errorType: "uncaughtException" | "unhandledRejection"
  ): void {
    this.logger.error(`Global Error - ${errorType}:`, error);

    if (!this.isTrustedError(error)) {
      this.logger.error(
        "Application has a non-operational error. Shutting down..."
      );
      process.exit(1);
    } else {
      this.logger.warn(error.message);
    }
  }

  private isTrustedError(error: any): boolean {
    return error instanceof HttpError && error.isOperational;
  }
}
