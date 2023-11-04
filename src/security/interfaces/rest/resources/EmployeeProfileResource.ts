import {ApiProperty} from "@nestjs/swagger";


export class EmployeeProfileResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  employeeId: number;
}