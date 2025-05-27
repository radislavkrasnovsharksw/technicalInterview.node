import "reflect-metadata";
import { AppDataSource } from "./data-source";
import app from "./app";
import { config } from "./config";

const PORT = config.port;

async function bootstrap() {
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap();
