import {ApiProperty} from "@nestjs/swagger";

export class CustomerResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}