import {ApiProperty} from "@nestjs/swagger";
import {CustomerProfileResource} from "@app/security/interfaces/rest/resources/CustomerProfileResource";

export class AuthenticateCustomerResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profile: CustomerProfileResource;

  @ApiProperty()
  token: string;
}