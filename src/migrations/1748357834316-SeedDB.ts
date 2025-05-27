import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDB1748357834316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert("station_statuses", [
      { status: "Available" },
      { status: "Occupied" },
      { status: "In maintenance" },
      { status: "Reserved" },
      { status: "Unavailable" },
      { status: "Partial faulted" },
      { status: "Reachable" },
      { status: "Dismissed" },
      { status: "Partial occupied" },
      { status: "Installed" },
      { status: "Planned" }
    ]);

    await queryRunner.manager.insert("plug_types", [
      { type: "Type 2 22kW" },
      { type: "Type 3A" },
      { type: "CCS Combo 2" },
      { type: "CHAdeMO" }
    ]);

    await queryRunner.manager.insert("installation_classes", [
      { class: "Public" },
      { class: "corporate" },
      { class: "Corporate" },
      { class: "supermarket" },
      { class: "Supermarket" },
      { class: "restaurant" },
      { class: "Restaurant" },
      { class: "hotel" },
      { class: "Hotel" },
      { class: "entertainment" },
      { class: "Entertainment" },
      { class: "car" },
      { class: "Car services" },
      { class: "other" },
      { class: "Other operators" }
    ]);

    await queryRunner.manager.insert("speed_types", [
      { type: "fastFast (<100kW)" },
      { type: "ultrafastUltra Fast (>100kW)" }
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear("station_statuses");
    await queryRunner.manager.clear("plug_types");
    await queryRunner.manager.clear("installation_classes");
    await queryRunner.manager.clear("speed_types");
  }
}
