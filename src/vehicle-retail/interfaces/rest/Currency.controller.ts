/*
@ApiBearerAuth()
@ApiTags('Vehicle Brands')
@Controller('api/v1/vehicle-retail/vehicle-brands')
export class VehicleBrandsController {
  constructor(
    @Inject(VehicleBrandService) private readonly vehicleBrandService: VehicleBrandService,
    private readonly vehicleBrandMapper: VehicleBrandMapper
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all vehicle brands.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle brand list retrieved successfully.',
    type: VehicleBrandResource,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized request.',
  })
  async getAll() {
    return this.vehicleBrandMapper.toResourceArray(await this.vehicleBrandService.getAll());
  }

  @Get(':vehicleBrandId')
  @ApiOperation({ summary: 'Get a vehicle brand by id.' })
  async getById(@Param('vehicleBrandId', ParseIntPipe) vehicleBrandId: number) {
    const result = await this.vehicleBrandService.getById(vehicleBrandId);

    if (!result.success) {
      throw new NotFoundException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle brand.' })
  async create(@Body() createVehicleBrandResource: CreateVehicleBrandResource) {
    const model = this.vehicleBrandMapper.toModel(createVehicleBrandResource);
    const result = await this.vehicleBrandService.create(model);

    if (!result.success) {
      throw new BadRequestException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }

  @Put(':vehicleBrandId')
  @ApiOperation({ summary: 'Update a vehicle brand.' })
  async update(
    @Param('vehicleBrandId', ParseIntPipe) vehicleBrandId: number,
    @Body() updateVehicleBrandResource: UpdateVehicleBrandResource
  ) {
    const result = await this.vehicleBrandService.update(vehicleBrandId, updateVehicleBrandResource);

    if (!result.success) {
      throw new NotFoundException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }

  @Delete(':vehicleBrandId')
  @ApiOperation({ summary: 'Delete a vehicle brand.' })
  async delete(@Param('vehicleBrandId', ParseIntPipe) vehicleBrandId: number) {
    const result = await this.vehicleBrandService.delete(vehicleBrandId);

    if (!result.success) {
      throw new NotFoundException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }
}
*/

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Controller, Get, HttpStatus, Inject } from "@nestjs/common";
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
}