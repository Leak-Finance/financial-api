import {ApiProperty} from "@nestjs/swagger";

export class CreateVehicleBrandResource {
  @ApiProperty()
  name: string;
}