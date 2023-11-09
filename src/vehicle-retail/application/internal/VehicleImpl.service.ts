import { Vehicle } from "@app/vehicle-retail/domain/model/Vehicle.entity";
import { VehicleRepository } from "@app/vehicle-retail/domain/persistence/VehicleRepository";
import { VehicleService } from "@app/vehicle-retail/domain/services/VehicleService";
import { VehicleResponse } from "@app/vehicle-retail/domain/services/communication/VehicleResponse";
import { UpdateVehicleResource } from "@app/vehicle-retail/interfaces/rest/resource/vehicle/UpdateVehicleResource";
import { Inject, Injectable } from "@nestjs/common";
import {VehicleBrandRepository} from "@app/vehicle-retail/domain/persistence/VehicleBrandRepository";

@Injectable()
export class VehicleImplService implements VehicleService {
  constructor(@Inject(VehicleRepository) private readonly vehicleRepository: VehicleRepository,
              @Inject(VehicleBrandRepository) private readonly vehicleBrandRepository: VehicleBrandRepository
  ) {
  }

  async create(brandId: number, Vehicle: Vehicle): Promise<VehicleResponse> {
    if (await this.vehicleRepository.existsByModel(Vehicle.model)) {
      return new VehicleResponse("There's an existing vehicle with the same model.");
    }
    const vehicleBrand = await this.vehicleBrandRepository.findById(brandId);
    if (vehicleBrand == null) {
      return new VehicleResponse("There's no existing vehicle brand with the same id.");
    }
    Vehicle.brand = vehicleBrand;
    const model = await this.vehicleRepository.persist(Vehicle);
    return new VehicleResponse(model);
  }

  async getAll(): Promise<Array<Vehicle>> {
    return await this.vehicleRepository.findAll();
  }

  async getAllByBrand(brandId: number): Promise<Array<Vehicle>> {
    const brand = await this.vehicleBrandRepository.findById(brandId);
    if (brand == null) {
      return [];
    }
    return await this.vehicleRepository.findByBrand(brand);
  }

  async getById(id: number): Promise<VehicleResponse> {
    const existingVehicle = await this.vehicleRepository.findById(id);

    if (existingVehicle == null) {
      return new VehicleResponse(`Vehicle with id ${id} not found.`);
    }

    return new VehicleResponse(existingVehicle);
  }

  async delete(id: number): Promise<VehicleResponse> {
    const existingVehicle = await this.vehicleRepository.findById(id);

    if (existingVehicle == null) {
      return new VehicleResponse(`Vehicle with id ${id} not found.`);
    }

    await this.vehicleRepository.remove(existingVehicle);
    return new VehicleResponse(existingVehicle);
  }

  async update(id: number, updateVehicleResource: UpdateVehicleResource): Promise<VehicleResponse> {
    console.log(id)
    const existingVehicle = await this.vehicleRepository.findById(id);

    if (existingVehicle == null) {
      return new VehicleResponse(`Vehicle with id ${id} not found.`);
    }

    const existingVehicleBrand = await this.vehicleBrandRepository.findById(updateVehicleResource.brandId);
    if (existingVehicleBrand == null) {
      return new VehicleResponse(`There's no existing vehicle brand with the same id.`);
    }

    existingVehicle.model = updateVehicleResource.model;
    existingVehicle.manufactureYear = updateVehicleResource.manufactureYear;
    existingVehicle.photoUrl = updateVehicleResource.photoUrl;

    const updatedVehicle = await this.vehicleRepository.persist(existingVehicle);
    return new VehicleResponse(updatedVehicle);
  }

  async getByModel(model: string): Promise<VehicleResponse> {
    const existingVehicle = await this.vehicleRepository.findByModel(model);

    if (existingVehicle == null) {
      return new VehicleResponse(`Vehicle with model ${model} not found.`);
    }

    return new VehicleResponse(existingVehicle);
  }
}
