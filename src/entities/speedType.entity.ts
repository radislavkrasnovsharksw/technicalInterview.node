import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Station } from "./station.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     SpeedType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         type:
 *           type: string
 */
@Entity("speed_types")
export class SpeedType {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "text", nullable: false })
  type!: string;

  @OneToMany(() => Station, (station) => station.speed_type)
  stations!: Station[];
}
