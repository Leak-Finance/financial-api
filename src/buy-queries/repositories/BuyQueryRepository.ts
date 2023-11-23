import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BuyQuery } from "@app/buy-queries/domain/models/BuyQuery";
import { Repository } from "typeorm";

@Injectable()
export class BuyQueryRepository {
  constructor(@InjectRepository(BuyQuery) private readonly repository: Repository<BuyQuery>) {}

  async persist(buyQuery: BuyQuery) {
    return this.repository.save(buyQuery);
  }

  async getAll() {
    return this.repository.find();
  }
}
