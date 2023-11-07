import {Module} from "@nestjs/common";
import {VehicleBrandsController} from "@app/vehicle-retail/interfaces/rest/VehicleBrands.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import {VehicleBrandRepository} from "@app/vehicle-retail/domain/persistence/VehicleBrandRepository";
import {VehicleBrandRepositoryImpl} from "@app/vehicle-retail/infrastructure/repositories/VehicleBrandRepositoryImpl";
import {VehicleBrandService} from "@app/vehicle-retail/domain/services/VehicleBrandService";
import {VehicleBrandImplService} from "@app/vehicle-retail/application/internal/VehicleBrandImpl.service";
import {VehicleBrandMapper} from "@app/vehicle-retail/interfaces/rest/mapper/VehicleBrandMapper";
import { Currency } from "@app/vehicle-retail/domain/model/Currency.entity";
import { CurrencyMapper } from "@app/vehicle-retail/interfaces/rest/mapper/CurrencyMapper";
import { CurrencyRepository } from "./domain/persistence/CurrencyRepository";
import { CurrencyRepositoryImpl } from "./infrastructure/repositories/CurrencyRepositoryImpl";
import { CurrencyService } from "./domain/services/CurrencyService";
import { CurrencyImplService } from "./application/internal/CurrencyImpl.service";
import { CurrencyController } from "./interfaces/rest/Currency.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleBrand, Currency])
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
    },
    CurrencyMapper,
    {
      provide: CurrencyRepository,
      useClass: CurrencyRepositoryImpl
    },
    {
      provide: CurrencyService,
      useClass: CurrencyImplService
    }
  ],
  controllers: [VehicleBrandsController, CurrencyController],
  exports: [],
})
export class VehicleRetailModule { }