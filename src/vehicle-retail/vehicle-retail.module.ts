import {Module} from "@nestjs/common";
import {VehicleBrandsController} from "@app/vehicle-retail/interfaces/rest/VehicleBrands.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import {VehicleBrandRepository} from "@app/vehicle-retail/domain/persistence/VehicleBrandRepository";
import {VehicleBrandRepositoryImpl} from "@app/vehicle-retail/infrastructure/repositories/VehicleBrandRepositoryImpl";

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleBrand])
  ],
  providers: [
    {
      provide: VehicleBrandRepository,
      useClass: VehicleBrandRepositoryImpl
    }
  ],
  controllers: [VehicleBrandsController],
  exports: [],
})
export class VehicleRetailModule { }