import { Vehicle } from "@app/vehicle-retail/domain/model/Vehicle.entity";
import { VehicleResponse } from "@app/vehicle-retail/domain/services/communication/VehicleResponse";
import { UpdateVehicleResource } from "@app/vehicle-retail/interfaces/rest/resource/vehicle/UpdateVehicleResource";
import { VehicleBrand } from "../model/VehicleBrand.entity";

export interface VehicleService {
  create(brandId: number, Vehicle: Vehicle): Promise<VehicleResponse>;
  getAll(): Promise<Array<Vehicle>>;
  getAllByBrand(brandId: number): Promise<Array<Vehicle>>;
  getById(id: number): Promise<VehicleResponse>;
  delete(id: number): Promise<VehicleResponse>;
  update(id: number, updateVehicleResource: UpdateVehicleResource): Promise<VehicleResponse>;
}

export const VehicleService = Symbol("VehicleService");
