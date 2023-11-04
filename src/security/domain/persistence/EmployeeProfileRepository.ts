import {EmployeeProfile} from "@app/security/domain/model/EmployeeProfile.entity";

export interface EmployeeProfileRepository {
  persist(employeeProfile: EmployeeProfile): Promise<EmployeeProfile>;
  findByEmployeeId(id: number): Promise<EmployeeProfile>;
}

export const EmployeeProfileRepository = Symbol("EmployeeProfileRepository");