import { Injectable } from "@nestjs/common";
import { VehicleResource } from "../resource/vehicle/VehicleResource";
import { Vehicle } from "@app/vehicle-retail/domain/model/Vehicle.entity";
import { CreateVehicleResource } from "../resource/vehicle/CreateVehicleResource";

@Injectable()
export class VehicleMapper {
  toModel(createVehicleResource: CreateVehicleResource) {
    return {
      id: undefined,
      model: createVehicleResource.model,
      manufactureYear: createVehicleResource.manufactureYear,
      photoUrl: createVehicleResource.photoUrl,
      brand: undefined,
    } as Vehicle;
  }

  toResource(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      model: vehicle.model,
      manufactureYear: vehicle.manufactureYear,
      photoUrl: vehicle.photoUrl,
      brand: vehicle.brand,
    } as VehicleResource;
  }

  toResourceArray(vehicles: Vehicle[]) {
    return vehicles.map(vehicle => this.toResource(vehicle));
  }
}
