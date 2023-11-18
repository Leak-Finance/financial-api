import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Customer} from "@app/security/domain/model/Customer.entity";

@Entity('customer_profiles')
export class CustomerProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  dni: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  photoUrl: string;

  @Column()
  @OneToOne(() => Customer, (customer) => customer.id)
  customerId: number;
}
