import {Injectable} from "@nestjs/common";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import {
  CreateVehicleBrandResource
} from "@app/vehicle-retail/interfaces/rest/resource/vehicleBrand/CreateVehicleResource";

@Injectable()
export class VehicleBrandMapper {

  toModel(createVehicleBrandResource: CreateVehicleBrandResource) {
    return {
      id: undefined,
      name: createVehicleBrandResource.name
    } as VehicleBrand;
  }

  toResource(vehicleBrand: VehicleBrand) {
    return {
      id: vehicleBrand.id,
      name: vehicleBrand.name
    } as VehicleBrand;
  }

  toResourceArray(models: Array<VehicleBrand>) {
    return models.map((model) => this.toResource(model));
  }
}