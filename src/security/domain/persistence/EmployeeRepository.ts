import {Employee} from "@app/security/domain/model/Employee.entity";

export interface EmployeeRepository {
  persist(employee: Employee): Promise<Employee>;
  findOneById(id: number): Promise<Employee>;
  findOneByUsername(username: string): Promise<Employee>;
  existsByUsername(username: string): Promise<boolean>;
}

export const EmployeeRepository = Symbol("EmployeeRepository");