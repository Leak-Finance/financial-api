import { VehiclePostResponse } from "@app/vehicle-retail/domain/services/communication/VehiclePostResponse";
import {
  UpdateVehiclePostResource
} from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/UpdateVehiclePostResource";
import {
  CreateVehiclePostResource
} from "@app/vehicle-retail/interfaces/rest/resource/vehiclePost/CreateVehiclePostResource";
import { VehiclePost } from "@app/vehicle-retail/domain/model/VehiclePost.entity";

export interface VehiclePostService {
  create(createVehiclePostResource: CreateVehiclePostResource): Promise<VehiclePostResponse>;
  getAll(): Promise<Array<VehiclePost>>;
  getById(id: number): Promise<VehiclePostResponse>;
  delete(id: number): Promise<VehiclePostResponse>;
  update(id: number, updateVehiclePostResource: UpdateVehiclePostResource): Promise<VehiclePostResponse>;
  getByDateBetween(startDate: Date, endDate: Date): Promise<Array<VehiclePost>>;
}

export const VehiclePostService = Symbol("VehiclePostService");
