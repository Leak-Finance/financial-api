import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import {VehicleBrandResponse} from "@app/vehicle-retail/domain/services/communication/VehicleBrandResponse";
import {
  UpdateVehicleBrandResource
} from "@app/vehicle-retail/interfaces/rest/resource/vehicleBrand/UpdateVehicleBrandResource";

export interface VehicleBrandService {
  create(vehicleBrand: VehicleBrand): Promise<VehicleBrandResponse>;
  getAll(): Promise<Array<VehicleBrand>>;
  getById(id: number): Promise<VehicleBrandResponse>;
  delete(id: number): Promise<VehicleBrandResponse>;
  update(id: number, updateVehicleBrandResource: UpdateVehicleBrandResource): Promise<VehicleBrandResponse>;
}

export const VehicleBrandService = Symbol("VehicleBrandService");