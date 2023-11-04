import {VehicleBrandService} from "@app/vehicle-retail/domain/services/VehicleBrandService";
import {Inject, Injectable} from "@nestjs/common";
import {VehicleBrandRepository} from "@app/vehicle-retail/domain/persistence/VehicleBrandRepository";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import {VehicleBrandResponse} from "@app/vehicle-retail/domain/services/communication/VehicleBrandResponse";
import {
  UpdateVehicleBrandResource
} from "@app/vehicle-retail/interfaces/rest/resource/vehicleBrand/UpdateVehicleBrandResource";

@Injectable()
export class VehicleBrandImplService implements VehicleBrandService {
  constructor(
    @Inject(VehicleBrandRepository) private readonly vehicleBrandRepository: VehicleBrandRepository
  ) { }

  create(vehicleBrand: VehicleBrand): Promise<VehicleBrandResponse> {
    return Promise.resolve(undefined);
  }

  delete(id: number): Promise<VehicleBrandResponse> {
    return Promise.resolve(undefined);
  }

  async getAll(): Promise<Array<VehicleBrand>> {
    return await this.vehicleBrandRepository.findAll();
  }

  async getById(id: number): Promise<VehicleBrandResponse> {
    const existingVehicleBrand = await this.vehicleBrandRepository.findById(id);

    if (existingVehicleBrand == null) {
      return new VehicleBrandResponse(`Vehicle brand with id ${id} not found.`);
    }

    return new VehicleBrandResponse(existingVehicleBrand);
  }

  update(id: number, updateVehicleBrandResource: UpdateVehicleBrandResource): Promise<VehicleBrandResponse> {
    return Promise.resolve(undefined);
  }


}