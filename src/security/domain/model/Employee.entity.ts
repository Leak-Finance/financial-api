import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Tenant} from "@app/security/domain/model/Tenant.entity";

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Tenant)
  tenant: Tenant;
}