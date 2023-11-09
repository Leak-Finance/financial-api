import {VehicleService} from "@app/vehicle-retail/domain/services/VehicleService";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {VehicleResource} from "./resource/vehicle/VehicleResource";
import {VehicleMapper} from "./mapper/VehicleMapper";
import {CreateVehicleResource} from "./resource/vehicle/CreateVehicleResource";
import { UpdateVehicleResource } from "@app/vehicle-retail/interfaces/rest/resource/vehicle/UpdateVehicleResource";

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
    return await this.vehicleService.getAll();
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
    const model = this.vehicleMapper.toModel(createVehicleResource);
    const vehicle = await this.vehicleService.create(brandId, model);
    if (!vehicle.success) {
      throw new BadRequestException([vehicle.message]);
    }
    return this.vehicleMapper.toResource(vehicle.resource);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update vehicle" })
  @ApiResponse({ status: HttpStatus.OK, description: "Return updated vehicle.", type: VehicleResource })
  @ApiUnauthorizedResponse({ description: "Unauthorized request." })
  async update(@Param("id") id: number, @Body() updateVehicleResource: UpdateVehicleResource): Promise<VehicleResource> {
    const vehicle = await this.vehicleService.update(id, updateVehicleResource);
    if (!vehicle.success) {
      throw new BadRequestException([vehicle.message]);
    }
    return this.vehicleMapper.toResource(vehicle.resource);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete vehicle" })
  @ApiResponse({ status: HttpStatus.OK, description: "Return deleted vehicle.", type: VehicleResource })
  @ApiUnauthorizedResponse({ description: "Unauthorized request." })
  async delete(@Param("id") id: number): Promise<VehicleResource> {
    const vehicle = await this.vehicleService.delete(id);
    if (!vehicle.success) {
      throw new BadRequestException([vehicle.message]);
    }
    return this.vehicleMapper.toResource(vehicle.resource);
  }
}
