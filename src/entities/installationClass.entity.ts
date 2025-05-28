import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Station } from "./station.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     InstallationClass:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         class:
 *           type: string
 */
@Entity("installation_classes")
export class InstallationClass {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: "text", nullable: false })
  class: string;

  @OneToMany(() => Station, (station) => station.installation_class)
  stations: Station[];
}
