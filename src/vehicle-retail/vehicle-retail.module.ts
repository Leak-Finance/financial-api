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
import {VehicleMapper} from "@app/vehicle-retail/interfaces/rest/mapper/VehicleMapper";
import {VehicleRepository} from "@app/vehicle-retail/domain/persistence/VehicleRepository";
import {VehicleRepositoryImpl} from "@app/vehicle-retail/infrastructure/repositories/VehicleRepositoryImpl";
import {VehicleService} from "@app/vehicle-retail/domain/services/VehicleService";
import {VehicleImplService} from "@app/vehicle-retail/application/internal/VehicleImpl.service";
import {Vehicle} from "@app/vehicle-retail/domain/model/Vehicle.entity";
import {VehicleController} from "@app/vehicle-retail/interfaces/rest/Vehicle.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleBrand, Currency, Vehicle])
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
    },
    VehicleMapper,
    {
      provide: VehicleRepository,
        useClass: VehicleRepositoryImpl
    },
    {
      provide: VehicleService,
      useClass: VehicleImplService,
    }
  ],
  controllers: [VehicleBrandsController, CurrencyController, VehicleController],
  exports: [],
})
export class VehicleRetailModule { }
