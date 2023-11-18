import { VehiclePostService } from "@app/vehicle-retail/domain/services/VehiclePostService";
import { Inject, Injectable } from "@nestjs/common";
import { VehicleRepository } from "@app/vehicle-retail/domain/persistence/VehicleRepository";
import {
  CreateVehiclePostResource,
} from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/CreateVehiclePostResource";
import { VehiclePostResponse } from "@app/vehicle-retail/domain/services/communication/VehiclePostResponse";
import { EmployeeProfileRepository } from "@app/security/domain/persistence/EmployeeProfileRepository";
import { CurrencyRepository } from "@app/vehicle-retail/domain/persistence/CurrencyRepository";
import { VehiclePostRepository } from "@app/vehicle-retail/domain/persistence/VehiclePostRepository";
import { VehiclePost } from "@app/vehicle-retail/domain/model/VehiclePost.entity";
import { VehiclePostMapper } from "@app/vehicle-retail/interfaces/rest/mapper/VehiclePostMapper";
import {
  UpdateVehiclePostResource,
} from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/UpdateVehiclePostResource";

@Injectable()
export class VehiclePostImplService implements VehiclePostService {

  constructor(@Inject(VehicleRepository) private readonly vehicleRepository: VehicleRepository,
              @Inject(VehiclePostRepository) private readonly vehiclePostRepository: VehiclePostRepository,
              @Inject(CurrencyRepository) private readonly currencyRepository: CurrencyRepository,
              private readonly vehiclePostMapper: VehiclePostMapper,
  ) {
  }

  async create(createVehiclePostResource: CreateVehiclePostResource): Promise<VehiclePostResponse> {
    const currency = await this.currencyRepository.findById(createVehiclePostResource.currencyId);
    if (currency == null) {
      return new VehiclePostResponse("There's no existing currency with the same id.");
    }
    const vehicle = await this.vehicleRepository.findById(createVehiclePostResource.vehicleId);
    if (vehicle == null) {
      return new VehiclePostResponse("There's no existing vehicle with the same id.");
    }
    // TODO: validate if employee profile exists
    if (createVehiclePostResource.price <= 0) {
      return new VehiclePostResponse("Price must be greater than 0.");
    }
    const vehiclePost = this.vehiclePostMapper.toModel(createVehiclePostResource);
    vehiclePost.currency = currency;
    vehiclePost.vehicle = vehicle;
    vehiclePost.createdAt = new Date();
    vehiclePost.updatedAt = new Date();
    const model = await this.vehiclePostRepository.persist(vehiclePost);
    return new VehiclePostResponse(model);
  }

  async delete(id: number): Promise<VehiclePostResponse> {
    const existingVehiclePost = await this.vehiclePostRepository.findById(id);
    if (existingVehiclePost == null) {
      return new VehiclePostResponse(`Vehicle post with id ${id} not found.`);
    }
    await this.vehiclePostRepository.remove(existingVehiclePost);
  }

  async getAll(): Promise<Array<VehiclePost>> {
    return await this.vehiclePostRepository.findAll();
  }

  async getById(id: number): Promise<VehiclePostResponse> {
    const existingVehiclePost = await this.vehiclePostRepository.findById(id);
    if (existingVehiclePost == null) {
      return new VehiclePostResponse(`Vehicle post with id ${id} not found.`);
    }
    return new VehiclePostResponse(existingVehiclePost);
  }

  async update(id: number, updateVehiclePostResource: UpdateVehiclePostResource): Promise<VehiclePostResponse> {
    const existingVehiclePost = await this.vehiclePostRepository.findById(id);
    if (existingVehiclePost == null) {
      return new VehiclePostResponse(`Vehicle post with id ${id} not found.`);
    }
    const vehicle = await this.vehicleRepository.findById(updateVehiclePostResource.vehicleId);
    if (vehicle == null) {
      return new VehiclePostResponse("There's no existing vehicle with the same id.");
    }
    const currency = await this.currencyRepository.findById(updateVehiclePostResource.currencyId);
    if (currency == null) {
      return new VehiclePostResponse("There's no existing currency with the same id.");
    }
    if (updateVehiclePostResource.price <= 0) {
      return new VehiclePostResponse("Price must be greater than 0.");
    }
    existingVehiclePost.description = updateVehiclePostResource.description;
    existingVehiclePost.vehicle = vehicle;
    existingVehiclePost.currency = currency;
    existingVehiclePost.price = updateVehiclePostResource.price;
    existingVehiclePost.updatedAt = new Date();
    const model = await this.vehiclePostRepository.persist(existingVehiclePost);
    return new VehiclePostResponse(model);
  }

  getByDateBetween(startDate: Date, endDate: Date): Promise<Array<VehiclePost>> {
    return this.vehiclePostRepository.findByDateBetween(startDate, endDate);
  }
}
