import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { VehiclePostService } from "@app/vehicle-retail/domain/services/VehiclePostService";
import {
  CreateVehiclePostResource
} from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/CreateVehiclePostResource";
import {
  UpdateVehiclePostResource
} from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/UpdateVehiclePostResource";

@ApiBearerAuth()
@ApiTags("Vehicle Posts")
@Controller("api/v1/vehicle-retail/vehicle-posts")
export class VehiclePostController {
  constructor(
    @Inject(VehiclePostService) private readonly vehiclePostService: VehiclePostService,
  ) {
  }

  @Get()
  @ApiOperation({ summary: "Get all vehicle posts." })
  @ApiResponse({
    status: 200,
    description: "Vehicle post list retrieved successfully.",
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async getAll() {
    return this.vehiclePostService.getAll();
  }

  @Get(":vehiclePostId")
  @ApiOperation({ summary: "Get a vehicle post by id." })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async getById(@Param("vehiclePostId") vehiclePostId: number) {
    const result = await this.vehiclePostService.getById(vehiclePostId);
    if (!result.success) {
      throw new NotFoundException([result.message]);
    }
    return result.resource;
  }

  // get by date between
  @Get(":startDate/:endDate")
  @ApiOperation({ summary: "Get a vehicle post by date between." })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async getByDateBetween(@Param("startDate") startDate: Date, @Param("endDate") endDate: Date) {
    return this.vehiclePostService.getByDateBetween(startDate, endDate);
  }

  @Post()
  @ApiOperation({ summary: "Create a new vehicle post." })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async create(@Body() createVehiclePostResource: CreateVehiclePostResource) {
    const result = await this.vehiclePostService.create(createVehiclePostResource);
    if (!result.success) {
      throw new NotFoundException([result.message]);
    }
    return result.resource;
  }

  @Put(":vehiclePostId")
  @ApiOperation({ summary: "Update a vehicle post." })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async update(@Param("vehiclePostId") vehiclePostId: number, @Body() updateVehiclePostResource: UpdateVehiclePostResource) {
    const result = await this.vehiclePostService.update(vehiclePostId, updateVehiclePostResource);
    if (!result.success) {
      throw new NotFoundException([result.message]);
    }
    return result.resource;
  }

@Delete(":vehiclePostId")
  @ApiOperation({ summary: "Delete a vehicle post." })
  @ApiUnauthorizedResponse({
    description: "Unauthorized request.",
  })
  async delete(@Param("vehiclePostId") vehiclePostId: number) {
    const result = await this.vehiclePostService.delete(vehiclePostId);
    if (!result.success) {
      throw new NotFoundException([result.message]);
    }
    return result.resource;
  }
}
