import "reflect-metadata";
import { AppDataSource } from "./data-source";
import app from "./app";
import { config } from "./config";
import { container } from "tsyringe";
import { ConsoleLogger } from "./logger/console.logger";
import { ErrorHandler } from "./errors/handler/errorHandler.error";
import { ILogger } from "./interfaces/logger/interface.interface";

const PORT = config.port;

async function bootstrap() {
  container.register<ILogger>("Logger", { useClass: ConsoleLogger });
  const logger = container.resolve<ILogger>("Logger");
  const errorHanlder = container.resolve(ErrorHandler);

  process.on("unhandledRejection", (reason: any) => {
    logger.error("Unhandled Rejection at:", reason);
    const errorToHandle =
      reason instanceof Error
        ? reason
        : new Error(String(reason || "Unknown unhandled rejection"));
    errorHanlder.handleGlobalError(errorToHandle, "unhandledRejection");
  });

  process.on("uncaughtException", (error: Error) => {
    logger.error("Uncaught Exception thrown:", error);
    errorHanlder.handleGlobalError(error, "uncaughtException");
  });

  try {
    await AppDataSource.initialize();
    logger.info("Data Source has been initialized!");

    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    logger.error("Failed to bootstrap application:", error);
  }
}

bootstrap();
