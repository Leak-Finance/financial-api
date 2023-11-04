import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EmployeeProfileRepository} from "@app/security/domain/persistence/EmployeeProfileRepository";
import {EmployeeProfile} from "@app/security/domain/model/EmployeeProfile.entity";

@Injectable()
export class EmployeeProfileRepositoryImpl implements EmployeeProfileRepository {
  constructor(
    @InjectRepository(EmployeeProfile)
    private readonly repository: Repository<EmployeeProfile>
  ) { }

  findByEmployeeId(id: number): Promise<EmployeeProfile> {
    return this.repository.findOneBy({ employeeId: id });
  }

  persist(employeeProfile: EmployeeProfile): Promise<EmployeeProfile> {
    return this.repository.save(employeeProfile);
  }
}