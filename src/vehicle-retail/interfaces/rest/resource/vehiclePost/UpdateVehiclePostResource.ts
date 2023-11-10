import { ApiProperty } from "@nestjs/swagger";

export class UpdateVehiclePostResource {
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  vehicleId: number;
  @ApiProperty()
  currencyId: number;
}
