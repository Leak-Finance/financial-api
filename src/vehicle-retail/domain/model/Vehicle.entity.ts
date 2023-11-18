import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  manufactureYear: number;

  @Column()
  photoUrl: string;

  @ManyToOne(() => VehicleBrand, { eager: true })
  brand: VehicleBrand;
}
