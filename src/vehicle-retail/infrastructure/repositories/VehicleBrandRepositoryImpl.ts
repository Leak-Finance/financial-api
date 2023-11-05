import {VehicleBrandRepository} from "@app/vehicle-retail/domain/persistence/VehicleBrandRepository";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import {Repository} from "typeorm";

@Injectable()
export class VehicleBrandRepositoryImpl implements VehicleBrandRepository {
  constructor(
    @InjectRepository(VehicleBrand) private readonly repository: Repository<VehicleBrand>
  ) { }

  async findAll(): Promise<Array<VehicleBrand>> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<VehicleBrand | null> {
    return await this.repository.findOneBy({ id: id });
  }

  async findByName(name: string): Promise<VehicleBrand | null> {
    return await this.repository.findOneBy({ name: name });
  }

  async persist(vehicleBrand: VehicleBrand): Promise<VehicleBrand> {
    return await this.repository.save(vehicleBrand);
  }

  async remove(vehicleBrand: VehicleBrand): Promise<void> {
    await this.repository.remove(vehicleBrand);
  }

  async existsByName(name: string): Promise<boolean> {
    return (await this.repository.findOneBy({ name: name })) != null;
  }
}