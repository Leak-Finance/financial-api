import {CustomerProfile} from "@app/security/domain/model/CustomerProfile.entity";

export interface CustomerProfileRepository {
  persist(customerProfile: CustomerProfile): Promise<CustomerProfile>;
}

export const CustomerProfileRepository = Symbol("CustomerProfileRepository");