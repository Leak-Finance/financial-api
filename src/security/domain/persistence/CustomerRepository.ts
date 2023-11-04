import {Customer} from "@app/security/domain/model/Customer.entity";

export interface CustomerRepository {
  persist(customer: Customer): Promise<Customer>;
  findOneById(id: number): Promise<Customer>;
  findOneByEmail(email: string): Promise<Customer>;
  existsByEmail(email: string): Promise<boolean>;
}

export const CustomerRepository = Symbol("CustomerRepository");