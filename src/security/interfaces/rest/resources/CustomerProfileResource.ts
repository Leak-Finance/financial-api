import {ApiProperty} from "@nestjs/swagger";

export class CustomerProfileResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  dni: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  photoUrl: string;

  @ApiProperty()
  customerId: number;
}
