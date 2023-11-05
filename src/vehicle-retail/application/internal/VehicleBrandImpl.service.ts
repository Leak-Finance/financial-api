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

  async create(vehicleBrand: VehicleBrand): Promise<VehicleBrandResponse> {
    if (await this.vehicleBrandRepository.existsByName(vehicleBrand.name)) {
      return new VehicleBrandResponse("There's an existing vehicle brand with the same name.");
    }

    const model = await this.vehicleBrandRepository.persist(vehicleBrand);
    return new VehicleBrandResponse(model);
  }

  async delete(id: number): Promise<VehicleBrandResponse> {
    const existingVehicleBrand = await this.vehicleBrandRepository.findById(id);

    if (existingVehicleBrand == null) {
      return new VehicleBrandResponse(`Vehicle brand with id ${id} not found.`);
    }

    await this.vehicleBrandRepository.remove(existingVehicleBrand);
    return new VehicleBrandResponse(existingVehicleBrand);
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

  async update(id: number, updateVehicleBrandResource: UpdateVehicleBrandResource): Promise<VehicleBrandResponse> {
    const existingVehicleBrand = await this.vehicleBrandRepository.findById(id);

    if (existingVehicleBrand == null) {
      return new VehicleBrandResponse(`Vehicle brand with id ${id} not found.`);
    }

    const existingVehicleBrandWithName = await this.vehicleBrandRepository.findByName(updateVehicleBrandResource.name);

    if (existingVehicleBrandWithName !== null && existingVehicleBrandWithName.id !== id) {
      return new VehicleBrandResponse(`There's an existing vehicle brand with the same name.`);
    }

    existingVehicleBrand.name = updateVehicleBrandResource.name;
    await this.vehicleBrandRepository.persist(existingVehicleBrand);

    return new VehicleBrandResponse(existingVehicleBrand);
  }
}