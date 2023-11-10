import { Injectable } from "@nestjs/common";
import {
  CreateVehiclePostResource,
} from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/CreateVehiclePostResource";
import { VehiclePost } from "@app/vehicle-retail/domain/model/VehiclePost.entity";
import { VehiclePostResource } from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/VehiclePostResource";

@Injectable()
export class VehiclePostMapper {
  toModel(createVehiclePostResource: CreateVehiclePostResource): VehiclePost {
    return {
      id: undefined,
      description: createVehiclePostResource.description,
      price: createVehiclePostResource.price,
      createdByEmployeeProfileId: createVehiclePostResource.createdByEmployeeProfileId,
      vehicle: undefined,
      currency: undefined,
    } as VehiclePost;
  }

  toResource(vehiclePost: VehiclePost): VehiclePostResource {
    return {
      id: vehiclePost.id,
      description: vehiclePost.description,
      createdAt: vehiclePost.createdAt,
      updatedAt: vehiclePost.updatedAt,
      price: vehiclePost.price,
      createdByEmployeeProfileId: vehiclePost.createdByEmployeeProfileId,
      vehicle: vehiclePost.vehicle,
      currency: vehiclePost.currency,
    } as VehiclePostResource;
  }

  toResourceArray(vehiclePosts: VehiclePost[]): VehiclePostResource[] {
    return vehiclePosts.map(vehiclePost => this.toResource(vehiclePost));
  }
}
