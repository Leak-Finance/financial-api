import {Injectable} from "@nestjs/common";
import {EmployeeResource} from "@app/security/interfaces/rest/resources/EmployeeResource";
import {Employee} from "@app/security/domain/model/Employee.entity";

@Injectable()
export class EmployeeMapper {

  toResource(employee: Employee): EmployeeResource {
    return {
      id: employee.id,
      username: employee.username,
    } as EmployeeResource;
  }
}