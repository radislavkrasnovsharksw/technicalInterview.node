import { ISeeder } from "../../interfaces/seeder/ISeeder.interface";
import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import crypto from "crypto";

export class StationSeeder implements ISeeder {
  constructor(private dataSource: DataSource) {}

  private randomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private generateStationId(input: string): string {
    return crypto
      .createHash("sha256")
      .update(input)
      .digest("hex")
      .substring(0, 12);
  }

  async seed(): Promise<void> {
    const statuses = await this.dataSource.manager.find("station_statuses");
    const installationClasses = await this.dataSource.manager.find(
      "installation_classes"
    );
    const speedTypes = await this.dataSource.manager.find("speed_types");
    const plugTypes = await this.dataSource.manager.find("plug_types");

    for (let i = 0; i < 20; i++) {
      const address = faker.location.streetAddress();
      const station_id = this.generateStationId(address + i);
      const status = this.randomElement(statuses);
      const speed_type = this.randomElement(speedTypes);
      const power = faker.number.int({ min: 30000, max: 120000 });
      const availability = 86400;
      const installation_class = this.randomElement(installationClasses);
      const lng = faker.location.longitude();
      const lat = faker.location.latitude();

      const insertResult = await this.dataSource.manager.insert("stations", {
        address,
        station_id,
        status: status.id,
        speed_type: speed_type.id,
        power,
        availability,
        installation_class: installation_class.id,
        lng,
        lat
      });

      const insertedStationId = insertResult.identifiers[0].id;

      const numPlugTypes = faker.number.int({ min: 1, max: 3 });
      const selectedPlugTypes = faker.helpers.arrayElements(
        plugTypes,
        numPlugTypes
      );

      for (const plugType of selectedPlugTypes) {
        await this.dataSource.manager.insert("station_plug_types", {
          station_id: insertedStationId,
          plug_type_id: plugType.id
        });
      }
    }
  }
}
