import { ApiProperty } from "@nestjs/swagger";

export class CreateVehicleResource {
  @ApiProperty()
  model: string;

  @ApiProperty()
  manufactureYear: number;

  @ApiProperty()
  photoUrl: string;
}
