import { Injectable } from "@nestjs/common";
import { BuyQueryRepository } from "@app/buy-queries/repositories/BuyQueryRepository";
import { CreateBuyQueryDto } from "@app/buy-queries/resources/CreateBuyQuery.dto";
import { BuyQuery } from "@app/buy-queries/domain/models/BuyQuery";

@Injectable()
export class BuyQueryService {
  constructor(private readonly buyQueryRepository: BuyQueryRepository) {}

  async saveQuery(createBuyQueryDto: CreateBuyQueryDto) {
    return await this.buyQueryRepository.persist({
      email: createBuyQueryDto.email,
      json: createBuyQueryDto.parameters,
    } as BuyQuery);
  }

  async getAll() {
    return await this.buyQueryRepository.getAll();
  }
}
