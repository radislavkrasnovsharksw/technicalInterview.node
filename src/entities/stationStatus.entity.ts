import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Station } from "./station.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     StationStatus:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         status:
 *           type: string
 */
@Entity("station_statuses")
export class StationStatus {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "text", nullable: false })
  status!: string;

  @OneToMany(() => Station, (station) => station.status)
  stations!: Station[];
}
