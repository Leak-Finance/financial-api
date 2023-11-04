import {EmployeeRepository} from "@app/security/domain/persistence/EmployeeRepository";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Employee} from "@app/security/domain/model/Employee.entity";

@Injectable()
export class EmployeeRepositoryImpl implements EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  async existsByUsername(username: string): Promise<boolean> {
    return (await this.repository.findOneBy({ username: username })) != null;
  }

  findOneById(id: number): Promise<Employee> {
    return this.repository.findOneBy({ id: id });
  }

  findOneByUsername(username: string): Promise<Employee> {
    return this.repository.findOneBy({ username: username });
  }

  persist(employee: Employee): Promise<Employee> {
    return this.repository.save(employee);
  }
}