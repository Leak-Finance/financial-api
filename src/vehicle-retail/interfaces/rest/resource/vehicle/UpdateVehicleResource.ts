import { ApiProperty } from "@nestjs/swagger";

export class UpdateVehicleResource {
  @ApiProperty()
  model: string;

  @ApiProperty()
  manufactureYear: number;

  @ApiProperty()
  photoUrl: string;
}
