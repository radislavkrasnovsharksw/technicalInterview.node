import "reflect-metadata";
import { Runner } from "./runner.seeder";
import { StationSeeder } from "./seeds/station.seeder";
import { AppDataSource } from "../data-source";

async function seed() {
  await AppDataSource.initialize();

  const runner = new Runner();
  runner.register(new StationSeeder(AppDataSource));

  await runner.runAll();

  await AppDataSource.destroy();
  console.log("All seeds completed");
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
