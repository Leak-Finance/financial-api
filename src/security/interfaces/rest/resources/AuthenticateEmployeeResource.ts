import {ApiProperty} from "@nestjs/swagger";
import {EmployeeProfileResource} from "@app/security/interfaces/rest/resources/EmployeeProfileResource";


export class AuthenticateEmployeeResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  profile: EmployeeProfileResource;

  @ApiProperty()
  token: string;
}