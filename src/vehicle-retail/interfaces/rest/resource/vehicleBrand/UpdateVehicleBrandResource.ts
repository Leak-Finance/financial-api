import {ApiProperty} from "@nestjs/swagger";

export class UpdateVehicleBrandResource {
  @ApiProperty()
  name: string;
}
