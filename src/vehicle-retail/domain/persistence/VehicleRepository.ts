import { Vehicle } from "@app/vehicle-retail/domain/model/Vehicle.entity";
import { VehicleBrand } from "../model/VehicleBrand.entity";

export interface VehicleRepository {
  findAll(): Promise<Array<Vehicle>>;
  findById(id: number): Promise<Vehicle | null>;
  findByModel(model: string): Promise<Vehicle | null>;
  findByBrand(brand: VehicleBrand): Promise<Array<Vehicle>>;
  persist(Vehicle: Vehicle): Promise<Vehicle>;
  remove(Vehicle: Vehicle): Promise<void>;
}

export const VehicleRepository = Symbol("VehicleRepository");
