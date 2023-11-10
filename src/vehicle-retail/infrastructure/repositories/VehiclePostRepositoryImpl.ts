import { VehiclePostRepository } from "@app/vehicle-retail/domain/persistence/VehiclePostRepository";
import { VehiclePost } from "@app/vehicle-retail/domain/model/VehiclePost.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";

@Injectable()
export class VehiclePostRepositoryImpl implements VehiclePostRepository {
  constructor(@InjectRepository(VehiclePost) private readonly repository: Repository<VehiclePost>) {
  }

  async findAll(): Promise<Array<VehiclePost>> {
    return await this.repository.find();
  }

  async findByDateBetween(startDate: Date, endDate: Date): Promise<Array<VehiclePost>> {
  return await this.repository.find({
      where: {
        createdAt: Between(startDate, endDate)
      },
    });
  }

  async findById(id: number): Promise<VehiclePost | null> {
    return await this.repository.findOneBy({ id: id });
  }

  async persist(vehiclePost: VehiclePost): Promise<VehiclePost> {
    return await this.repository.save(vehiclePost);
  }

  async remove(vehiclePost: VehiclePost): Promise<void> {
    await this.repository.remove(vehiclePost);
  }
}
