import { singleton } from "tsyringe";
import { config } from "../config";
import { ILogger } from "../interfaces/logger/interface.interface";

@singleton()
export class ConsoleLogger implements ILogger {
  public info(message: string, meta?: any): void {
    console.info(
      `[INFO] ${new Date().toISOString()}: ${message}`,
      meta && Object.keys(meta).length > 0 ? JSON.stringify(meta) : ""
    );
  }

  public warn(message: string, meta?: any): void {
    console.warn(
      `[WARN] ${new Date().toISOString()}: ${message}`,
      meta && Object.keys(meta).length > 0 ? JSON.stringify(meta) : ""
    );
  }

  public error(message: string, error?: Error, meta?: any): void {
    console.error(
      `[ERROR] ${new Date().toISOString()}: ${message}`,
      meta && Object.keys(meta).length > 0 ? JSON.stringify(meta) : "",
      error || ""
    );
    if (error?.stack) {
      console.error(error.stack);
    }
  }

  public debug(message: string, meta?: any): void {
    if (config.nodeEnv === "development") {
      console.debug(
        `[DEBUG] ${new Date().toISOString()}: ${message}`,
        meta && Object.keys(meta).length > 0 ? JSON.stringify(meta) : ""
      );
    }
  }
}
