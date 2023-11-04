import {Controller, Delete, Get, Post, Put} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Vehicle Brands')
@Controller('api/v1/vehicle-retail/vehicle-brands')
export class VehicleBrandsController {


  @Get()
  @ApiOperation({ summary: 'Get all vehicle brands.' })
  async getAll() {

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