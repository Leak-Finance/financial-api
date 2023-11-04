import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('vehicle_brands')
export class VehicleBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}