import {Module} from "@nestjs/common";
import {VehicleBrandsController} from "@app/vehicle-retail/interfaces/rest/VehicleBrands.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import {VehicleBrandRepository} from "@app/vehicle-retail/domain/persistence/VehicleBrandRepository";
import {VehicleBrandRepositoryImpl} from "@app/vehicle-retail/infrastructure/repositories/VehicleBrandRepositoryImpl";
import {VehicleBrandService} from "@app/vehicle-retail/domain/services/VehicleBrandService";
import {VehicleBrandImplService} from "@app/vehicle-retail/application/internal/VehicleBrandImpl.service";
import {VehicleBrandMapper} from "@app/vehicle-retail/interfaces/rest/mapper/VehicleBrandMapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleBrand])
  ],
  providers: [
    VehicleBrandMapper,
    {
      provide: VehicleBrandRepository,
      useClass: VehicleBrandRepositoryImpl
    },
    {
      provide: VehicleBrandService,
      useClass: VehicleBrandImplService
    }
  ],
  controllers: [VehicleBrandsController],
  exports: [],
})
export class VehicleRetailModule { }