import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuyQuery } from "@app/buy-queries/domain/models/BuyQuery";
import { BuyQueryService } from "@app/buy-queries/service/buyQueryService";
import { BuyQueryRepository } from "@app/buy-queries/repositories/BuyQueryRepository";
import { BuyQueryController } from "@app/buy-queries/api/BuyQuery.controller";

@Module({
  imports: [TypeOrmModule.forFeature([BuyQuery])],
  providers: [BuyQueryRepository, BuyQueryService],
  controllers: [BuyQueryController],
})
export class BuyQueryModule {}
