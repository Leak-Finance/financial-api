import {Module} from "@nestjs/common";
import {VehicleBrandsController} from "@app/vehicle-retail/interfaces/rest/VehicleBrands.controller";

@Module({
  imports: [],
  providers: [],
  controllers: [VehicleBrandsController],
  exports: [],
})
export class VehicleRetailModule { }