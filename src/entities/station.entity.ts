import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { StationStatus } from "./stationStatus.entity";
import { PlugType } from "./plugType.entity";
import { InstallationClass } from "./installationClass.entity";
import { SpeedType } from "./speedType.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     Station:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         address:
 *           type: string
 *         station_id:
 *           type: string
 *         power:
 *           type: integer
 *         availability:
 *           type: integer
 *         lng:
 *           type: number
 *           format: float
 *         lat:
 *           type: number
 *           format: float
 *         status:
 *           $ref: '#/components/schemas/StationStatus'
 *         speed_type:
 *           $ref: '#/components/schemas/SpeedType'
 *         plug_types:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PlugType'
 *         installation_class:
 *           $ref: '#/components/schemas/InstallationClass'
 */
@Entity("stations")
export class Station {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "text", nullable: false })
  address!: string;

  @Column({ type: "text", nullable: false })
  station_id!: string;

  @ManyToOne(() => StationStatus, (status) => status.stations, {
    nullable: false
  })
  @JoinColumn({ name: "status" })
  status!: StationStatus;

  @ManyToOne(() => SpeedType, (speedType) => speedType.stations, {
    nullable: false
  })
  @JoinColumn({ name: "speed_type" })
  speed_type!: SpeedType;

  @Column({ type: "float", nullable: false })
  power!: number;

  @ManyToMany(() => PlugType, (plugType) => plugType.stations)
  @JoinTable({
    name: "station_plug_types",
    joinColumn: {
      name: "station_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "plug_type_id",
      referencedColumnName: "id"
    }
  })
  plug_types!: PlugType[];

  @Column({ type: "float", nullable: false })
  availability!: number;

  @ManyToOne(
    () => InstallationClass,
    (installationClass) => installationClass.stations,
    { nullable: false }
  )
  @JoinColumn({ name: "installation_class" })
  installation_class!: InstallationClass;

  @Column({
    type: "float",
    nullable: false,
    comment: "Longitude coordinate for map rendering"
  })
  lng!: number;

  @Column({
    type: "float",
    nullable: false,
    comment: "Latitude coordinate for map rendering"
  })
  lat!: number;
}
