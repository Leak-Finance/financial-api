import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Inject, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { VehicleBrandService } from "@app/vehicle-retail/domain/services/VehicleBrandService";
import { VehicleBrandMapper } from "@app/vehicle-retail/interfaces/rest/mapper/VehicleBrandMapper";
import { VehicleBrandResource } from "@app/vehicle-retail/interfaces/rest/resource/vehicleBrand/VehicleBrandResource";
import { CreateVehicleBrandResource } from "@app/vehicle-retail/interfaces/rest/resource/vehicleBrand/CreateVehicleResource";
import { UpdateVehicleBrandResource } from "@app/vehicle-retail/interfaces/rest/resource/vehicleBrand/UpdateVehicleBrandResource";

@ApiBearerAuth()
@ApiTags("Vehicle Brands")
@Controller("api/v1/vehicle-retail/vehicle-brands")
export class VehicleBrandsController {
  constructor(
    @Inject(VehicleBrandService) private readonly vehicleBrandService: VehicleBrandService,
    private readonly vehicleBrandMapper: VehicleBrandMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all vehicle brands." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Vehicle brand list retrieved successfully.",
    type: VehicleBrandResource,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async getAll() {
    return this.vehicleBrandMapper.toResourceArray(await this.vehicleBrandService.getAll());
  }

  @Get(":vehicleBrandId")
  @ApiOperation({ summary: "Get a vehicle brand by id." })
  async getById(@Param("vehicleBrandId", ParseIntPipe) vehicleBrandId: number) {
    const result = await this.vehicleBrandService.getById(vehicleBrandId);

    if (!result.success) {
      throw new NotFoundException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }

  @Post()
  @ApiOperation({ summary: "Create a new vehicle brand." })
  async create(@Body() createVehicleBrandResource: CreateVehicleBrandResource) {
    const model = this.vehicleBrandMapper.toModel(createVehicleBrandResource);
    const result = await this.vehicleBrandService.create(model);

    if (!result.success) {
      throw new BadRequestException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }

  @Put(":vehicleBrandId")
  @ApiOperation({ summary: "Update a vehicle brand." })
  async update(@Param("vehicleBrandId", ParseIntPipe) vehicleBrandId: number, @Body() updateVehicleBrandResource: UpdateVehicleBrandResource) {
    const result = await this.vehicleBrandService.update(vehicleBrandId, updateVehicleBrandResource);

    if (!result.success) {
      throw new NotFoundException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }

  @Delete(":vehicleBrandId")
  @ApiOperation({ summary: "Delete a vehicle brand." })
  async delete(@Param("vehicleBrandId", ParseIntPipe) vehicleBrandId: number) {
    const result = await this.vehicleBrandService.delete(vehicleBrandId);

    if (!result.success) {
      throw new NotFoundException([result.message]);
    }

    return this.vehicleBrandMapper.toResource(result.resource);
  }
}

