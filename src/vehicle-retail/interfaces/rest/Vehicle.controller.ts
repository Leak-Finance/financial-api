import { VehicleService } from "@app/vehicle-retail/domain/services/VehicleService";
import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { VehicleResource } from "./resource/vehicle/VehicleResource";
import { VehicleBrand } from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import { VehicleBrandService } from "@app/vehicle-retail/domain/services/VehicleBrandService";
import { VehicleMapper } from "./mapper/VehicleMapper";
import { CreateVehicleResource } from "./resource/vehicle/CreateVehicleResource";

@ApiBearerAuth()
@ApiTags("vehicles")
@Controller("api/v1/vehicle-retail/vehicles")
export class VehicleController {
  constructor(
    @Inject(VehicleService) private readonly vehicleService: VehicleService,
    private readonly vehicleMapper: VehicleMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all vehicles" })
  @ApiResponse({ status: HttpStatus.OK, description: "Return all vehicles.", type: VehicleResource, isArray: true })
  @ApiUnauthorizedResponse({ description: "Unauthorized request." })
  async getAll(): Promise<VehicleResource[]> {
    const vehicles = await this.vehicleService.getAll();
    return vehicles;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get vehicle by id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Return vehicle by id.", type: VehicleResource })
  @ApiUnauthorizedResponse({ description: "Unauthorized request." })
  async getById(@Param("id") id: number): Promise<VehicleResource> {
    const vehicle = await this.vehicleService.getById(id);
    return this.vehicleMapper.toResource(vehicle.resource);
  }

  @Get("brand/:brandId")
  @ApiOperation({ summary: "Get vehicles by brand" })
  @ApiResponse({ status: HttpStatus.OK, description: "Return vehicles by brand.", type: VehicleResource, isArray: true })
  @ApiUnauthorizedResponse({ description: "Unauthorized request." })
  async getByBrand(@Param("brandId") brandId: number): Promise<VehicleResource[]> {
    const vehicles = await this.vehicleService.getAllByBrand(brandId);
    return this.vehicleMapper.toResourceArray(vehicles);
  }

  @Post("brand/:brandId")
  @ApiOperation({ summary: "Create vehicle" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Return created vehicle.", type: VehicleResource })
  @ApiUnauthorizedResponse({ description: "Unauthorized request." })
  async create(@Param("brandId") brandId: number, @Body() createVehicleResource: CreateVehicleResource): Promise<VehicleResource> {
    // TODO
    return undefined;
  }
}
