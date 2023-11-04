import {ApiProperty} from "@nestjs/swagger";

export class EmployeeResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;
}