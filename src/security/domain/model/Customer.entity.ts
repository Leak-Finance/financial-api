import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}