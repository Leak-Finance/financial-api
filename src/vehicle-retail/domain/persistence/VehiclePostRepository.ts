import { VehiclePost } from "@app/vehicle-retail/domain/model/VehiclePost.entity";

export interface VehiclePostRepository {
  findAll(): Promise<Array<VehiclePost>>;
  findById(id: number): Promise<VehiclePost | null>;
  persist(vehiclePost: VehiclePost): Promise<VehiclePost>;
  remove(vehiclePost: VehiclePost): Promise<void>;
  findByDateBetween(startDate: Date, endDate: Date): Promise<Array<VehiclePost>>;
}

export const VehiclePostRepository = Symbol("VehiclePostRepository");
