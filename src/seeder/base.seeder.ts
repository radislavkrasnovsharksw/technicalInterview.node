import { ISeeder } from "../interfaces/seeder/ISeeder.interface";

export abstract class BaseSeeder implements ISeeder {
    abstract seed(): Promise<void>;
}
