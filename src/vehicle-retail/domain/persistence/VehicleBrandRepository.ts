import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";

export interface VehicleBrandRepository {
  findAll(): Promise<Array<VehicleBrand>>;
  findById(id: number): Promise<VehicleBrand | null>;
  findByName(name: string): Promise<VehicleBrand | null>;
  persist(vehicleBrand: VehicleBrand): Promise<VehicleBrand>;
  remove(vehicleBrand: VehicleBrand): Promise<void>;
  existsByName(name: string): Promise<boolean>;
}

export const VehicleBrandRepository = Symbol("VehicleBrandRepository");