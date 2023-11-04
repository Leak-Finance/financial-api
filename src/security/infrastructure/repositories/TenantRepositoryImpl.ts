import {TenantRepository} from "@app/security/domain/persistence/TenantRepository";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Tenant} from "@app/security/domain/model/Tenant.entity";

@Injectable()
export class TenantRepositoryImpl implements TenantRepository {
  constructor(
    @InjectRepository(Tenant)
    private readonly repository: Repository<Tenant>,
  ) {}

  findOneById(id: number): Promise<Tenant> {
    return this.repository.findOneBy({ id: id });
  }

  persist(tenant: Tenant): Promise<Tenant> {
    return this.repository.save(tenant);
  }
}