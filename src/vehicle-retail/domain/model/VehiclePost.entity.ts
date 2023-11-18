import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Vehicle} from "@app/vehicle-retail/domain/model/Vehicle.entity";
import {Currency} from "@app/vehicle-retail/domain/model/Currency.entity";

@Entity('vehicle_posts')
export class VehiclePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column()
  price: number;

  @Column()
  createdByEmployeeProfileId: number;

  @ManyToOne(() => Vehicle, { eager: true })
  vehicle: Vehicle;

  @ManyToOne(() => Currency, { eager: true })
  currency: Currency;
}
