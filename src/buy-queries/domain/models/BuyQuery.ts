import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("buy_queries")
export class BuyQuery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: "json" })
  json: any;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
