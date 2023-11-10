import { ApiProperty } from "@nestjs/swagger";

export class CreateVehiclePostResource {
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  createdByEmployeeProfileId: number;
  @ApiProperty()
  vehicleId: number;
  @ApiProperty()
  currencyId: number;
}
