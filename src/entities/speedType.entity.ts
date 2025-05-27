import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Station } from "./station.entity";

@Entity("speed_types")
export class SpeedType {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "text", nullable: false })
  type!: string;

  @OneToMany(() => Station, (station) => station.speed_type)
  stations!: Station[];
}
