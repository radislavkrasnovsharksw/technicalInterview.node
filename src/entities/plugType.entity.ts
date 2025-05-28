import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Station } from "./station.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     PlugType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         type:
 *           type: string
 */
@Entity("plug_types")
export class PlugType {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "text", nullable: false })
  type!: string;

  @ManyToMany(() => Station, (station) => station.plug_types)
  stations!: Station[];
}
