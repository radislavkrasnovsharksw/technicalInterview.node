import { DataSource } from "typeorm";
import path from "path";

const isCompiled = __filename.endsWith(".js");

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [
    isCompiled
      ? path.join(__dirname, "/entities/**/*.js")
      : path.join(__dirname, "/entities/**/*.ts")
  ],
  migrations: [
    isCompiled
      ? path.join(__dirname, "/migrations/**/*.js")
      : path.join(__dirname, "/migrations/**/*.ts")
  ],
  subscribers: []
});
