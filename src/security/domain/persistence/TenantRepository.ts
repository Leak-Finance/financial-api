import {Tenant} from "@app/security/domain/model/Tenant.entity";

export interface TenantRepository {
  persist(tenant: Tenant): Promise<Tenant>;
  findOneById(id: number): Promise<Tenant>;
}

export const TenantRepository = Symbol("TenantRepository");