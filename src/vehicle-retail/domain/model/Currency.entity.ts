import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  symbol: string;
}