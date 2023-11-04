import {Controller, Delete, Get, HttpStatus, Inject, Post, Put} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {VehicleBrandService} from "@app/vehicle-retail/domain/services/VehicleBrandService";
import {VehicleBrandMapper} from "@app/vehicle-retail/interfaces/rest/mapper/VehicleBrandMapper";
import {VehicleBrandResource} from "@app/vehicle-retail/interfaces/rest/resource/vehicleBrand/VehicleBrandResource";

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

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle brand by id.' })
  async getById() {

  }

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle brand.' })
  async create() {

  }

  @Put(':vehicleBrandId')
  @ApiOperation({ summary: 'Update a vehicle brand.' })
  async update() {

  }

  @Delete(':vehicleBrandId')
  @ApiOperation({ summary: 'Delete a vehicle brand.' })
  async delete() {

  }
}