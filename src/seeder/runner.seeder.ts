import { ISeeder } from "../interfaces/seeder/ISeeder.interface";

export class Runner {
  private seeders: ISeeder[] = [];

  public register(seeder: ISeeder): void {
    this.seeders.push(seeder);
  }

  public async runAll(): Promise<void> {
    for (const seeder of this.seeders) {
      await seeder.seed();
      console.log(`${seeder.constructor.name} completed`);
    }
  }
}
