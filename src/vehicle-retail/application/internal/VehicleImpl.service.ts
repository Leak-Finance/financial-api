import { Vehicle } from "@app/vehicle-retail/domain/model/Vehicle.entity";
import { VehicleBrand } from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import { VehicleRepository } from "@app/vehicle-retail/domain/persistence/VehicleRepository";
import { VehicleService } from "@app/vehicle-retail/domain/services/VehicleService";
import { VehicleResponse } from "@app/vehicle-retail/domain/services/communication/VehicleResponse";
import { UpdateVehicleResource } from "@app/vehicle-retail/interfaces/rest/resource/vehicle/UpdateVehicleResource";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class VehicleImplService implements VehicleService {
  constructor(@Inject(VehicleRepository) private readonly vehicleRepository: VehicleRepository) {}

  async create(Vehicle: Vehicle): Promise<VehicleResponse> {
    // TODO: validate Vehicle
    const model = await this.vehicleRepository.persist(Vehicle);
    return new VehicleResponse(model);
  }

  async getAll(): Promise<Array<Vehicle>> {
    return await this.vehicleRepository.findAll();
  }

  async getAllByBrand(brandId: number): Promise<Array<Vehicle>> {
    // TODO
    return undefined;
  }

  async getById(id: number): Promise<VehicleResponse> {
    // TODO
    return undefined;
  }

  async delete(id: number): Promise<VehicleResponse> {
    // TODO
    return undefined;
  }

  async update(id: number, updateVehicleResource: UpdateVehicleResource): Promise<VehicleResponse> {
    // TODO
    return undefined;
  }

  async getByModel(model: string): Promise<VehicleResponse> {
    // TODO
    return undefined;
  }

  async getByBrand(brand: VehicleBrand): Promise<Array<Vehicle>> {
    // TODO
    return undefined;
  }
}
