import {CustomerProfile} from "@app/security/domain/model/CustomerProfile.entity";

export interface CustomerProfileRepository {
  persist(customerProfile: CustomerProfile): Promise<CustomerProfile>;
  findByCustomerId(id: number): Promise<CustomerProfile>;
}

export const CustomerProfileRepository = Symbol("CustomerProfileRepository");