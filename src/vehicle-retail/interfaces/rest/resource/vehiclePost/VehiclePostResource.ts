import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "@app/vehicle-retail/domain/model/Vehicle.entity";
import { Currency } from "@app/vehicle-retail/domain/model/Currency.entity";

export class VehiclePostResource {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  price: number;
  @ApiProperty()
  createdByEmployeeProfileId: number;
  @ApiProperty()
  vehicle: Vehicle;
  @ApiProperty()
  currency: Currency;
}
