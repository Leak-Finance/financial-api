import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { CurrencyService } from "@app/vehicle-retail/domain/services/CurrencyService";
import { CurrencyMapper } from "@app/vehicle-retail/interfaces/rest/mapper/CurrencyMapper";
import { CurrencyResource } from "@app/vehicle-retail/interfaces/rest/resource/currency/CurrencyResource";

@ApiBearerAuth()
@ApiTags("Currencies")
@Controller("api/v1/vehicle-retail/currencies")
export class CurrencyController {
  constructor(
    @Inject(CurrencyService) private readonly currencyService: CurrencyService,
    private readonly currencyMapper: CurrencyMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all currencies." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Currency list retrieved successfully.",
    type: CurrencyResource,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async getAll() {
    return this.currencyMapper.toResourceArray(await this.currencyService.getAll());
  }

  @Get(":id")
  @ApiOperation({ summary: "Get currency by id." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Currency retrieved successfully.",
    type: CurrencyResource,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async getById(@Param("id") id: number) {
    const result = await this.currencyService.getById(id);
    if (!result.success) {
      throw new NotFoundException([result.message]);
    }
    return this.currencyMapper.toResource(result.resource);
  }

  @Post()
  @ApiOperation({ summary: "Create currency." })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Currency created successfully.",
    type: CurrencyResource,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async create(@Body() currency: CurrencyResource) {
    const model = this.currencyMapper.toModel(currency);
    const result = await this.currencyService.create(model);
    if (!result.success) {
      throw new BadRequestException([result.message]);
    }
    return this.currencyMapper.toResource(result.resource);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update currency." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Currency updated successfully.",
    type: CurrencyResource,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async update(@Param("id") id: number, @Body() currency: CurrencyResource) {
    const result = await this.currencyService.update(id, currency);
    if (!result.success) {
      throw new BadRequestException([result.message]);
    }
    return this.currencyMapper.toResource(result.resource);
  }
}
