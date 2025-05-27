import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm";

export class Stations1748348913908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "station_statuses",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true
          },
          {
            name: "status",
            type: "text",
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "speed_types",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true
          },
          {
            name: "type",
            type: "text",
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "plug_types",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true
          },
          {
            name: "type",
            type: "text",
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "installation_classes",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true
          },
          {
            name: "class",
            type: "text",
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "stations",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true
          },
          {
            name: "address",
            type: "text",
            isNullable: false
          },
          {
            name: "station_id",
            type: "text",
            isNullable: false
          },
          {
            name: "status",
            type: "integer",
            isNullable: false
          },
          {
            name: "speed_type",
            type: "integer",
            isNullable: false
          },
          {
            name: "power",
            type: "float",
            isNullable: false
          },
          {
            name: "availability",
            type: "float",
            isNullable: false
          },
          {
            name: "installation_class",
            type: "integer",
            isNullable: false
          },
          {
            name: "lng",
            type: "float",
            isNullable: false,
            comment: "Longitude coordinate for map rendering"
          },
          {
            name: "lat",
            type: "float",
            isNullable: false,
            comment: "Latitude coordinate for map rendering"
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "station_plug_types",
        columns: [
          {
            name: "station_id",
            type: "integer",
            isPrimary: true,
            unsigned: true
          },
          {
            name: "plug_type_id",
            type: "integer",
            isPrimary: true,
            unsigned: true
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      "station_plug_types",
      new TableForeignKey({
        columnNames: ["station_id"],
        referencedTableName: "stations",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "station_plug_types",
      new TableForeignKey({
        columnNames: ["plug_type_id"],
        referencedTableName: "plug_types",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "stations",
      new TableForeignKey({
        columnNames: ["status"],
        referencedTableName: "station_statuses",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "stations",
      new TableForeignKey({
        columnNames: ["speed_type"],
        referencedTableName: "speed_types",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "stations",
      new TableForeignKey({
        columnNames: ["installation_class"],
        referencedTableName: "installation_classes",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const stationPlugTypesTable =
      await queryRunner.getTable("station_plug_types");
    if (stationPlugTypesTable) {
      for (const fk of stationPlugTypesTable.foreignKeys) {
        await queryRunner.dropForeignKey("station_plug_types", fk);
      }
    }

    await queryRunner.dropTable("station_plug_types");

    const stationsTable = await queryRunner.getTable("stations");
    if (stationsTable) {
      for (const fk of stationsTable.foreignKeys) {
        await queryRunner.dropForeignKey("stations", fk);
      }
    }

    await queryRunner.dropTable("stations");
    await queryRunner.dropTable("installation_classes");
    await queryRunner.dropTable("plug_types");
    await queryRunner.dropTable("station_statuses");
    await queryRunner.dropTable("speed_types");
  }
}
