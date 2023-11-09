import { Vehicle } from "@app/vehicle-retail/domain/model/Vehicle.entity";
import { VehicleBrand } from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import { VehicleRepository } from "@app/vehicle-retail/domain/persistence/VehicleRepository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class VehicleRepositoryImpl implements VehicleRepository {
  constructor(@InjectRepository(Vehicle) private readonly repository: Repository<Vehicle>) {}

  async findAll(): Promise<Array<Vehicle>> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Vehicle | null> {
    return await this.repository.findOneBy({ id: id });
  }

  async findByModel(model: string): Promise<Vehicle | null> {
    return await this.repository.findOneBy({ model: model });
  }

  async findByBrand(brand: VehicleBrand): Promise<Array<Vehicle>> {
    return await this.repository.findBy({ brand: brand });
  }

  async persist(Vehicle: Vehicle): Promise<Vehicle> {
    return await this.repository.save(Vehicle);
  }

  async remove(Vehicle: Vehicle): Promise<void> {
    await this.repository.remove(Vehicle);
  }
}
