import {ApiProperty} from "@nestjs/swagger";

export class VehicleBrandResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
