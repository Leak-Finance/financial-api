import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CustomerProfile} from "@app/security/domain/model/CustomerProfile.entity";
import {Repository} from "typeorm";
import {CustomerProfileRepository} from "@app/security/domain/persistence/CustomerProfileRepository";

@Injectable()
export class CustomerProfileRepositoryImpl implements CustomerProfileRepository{
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly repository: Repository<CustomerProfile>
  ) { }

  persist(customerProfile: CustomerProfile): Promise<CustomerProfile> {
    return this.repository.save(customerProfile);
  }

  findByCustomerId(id: number): Promise<CustomerProfile> {
    return this.repository.findOneBy({ customerId: id });
  }
}