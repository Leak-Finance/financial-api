import {Controller, Delete, Get, Post, Put} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Vehicle Brands')
@Controller('api/v1/vehicle-retail/vehicle-brands')
export class VehicleBrandsController {


  @Get()
  async getAll() {

  }

  @Get(':id')
  async getById() {

  }

  @Post()
  async create() {

  }

  @Put(':vehicleBrandId')
  async update() {

  }

  @Delete(':vehicleBrandId')
  async delete() {

  }
}