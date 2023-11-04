import {CustomerRepository} from "@app/security/domain/persistence/CustomerRepository";
import {Customer} from "@app/security/domain/model/Customer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async existsByEmail(email: string): Promise<boolean> {
    return (await this.repository.findOneBy({ email: email })) !== null;
  }

  findOneById(id: number): Promise<Customer> {
    return this.repository.findOneBy({ id: id });
  }

  persist(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }

}