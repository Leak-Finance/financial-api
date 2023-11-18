import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ruc: string;

  @Column()
  email: string;

  @Column()
  logoUrl: string;

  @Column()
  phoneNumber: string;

  @Column()
  photoUrl: string;
}
