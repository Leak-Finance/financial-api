import {Body, Controller, Get, Post} from "@nestjs/common";
import { Public } from "@app/shared/infrastructure/decorator/public.decorator";
import { ApiTags } from "@nestjs/swagger";
import { CreateBuyQueryDto } from "@app/buy-queries/resources/CreateBuyQuery.dto";
import { BuyQueryService } from "@app/buy-queries/service/buyQueryService";

@Public()
@ApiTags("BuyQuery")
@Controller("api/v1/buy-queries/")
export class BuyQueryController {
  constructor(private readonly buyQueryService: BuyQueryService) {}

  @Get()
  async getQuery() {
    return await this.buyQueryService.getAll();
  }
  @Post()
  async saveQuery(@Body() createBuyQueryDto: CreateBuyQueryDto) {
    return await this.buyQueryService.saveQuery(createBuyQueryDto);
  }
}
