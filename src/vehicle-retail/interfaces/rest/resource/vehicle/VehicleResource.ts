import { VehicleBrand } from "@app/vehicle-retail/domain/model/VehicleBrand.entity";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  model: string;

  @ApiProperty()
  manufactureYear: number;

  @ApiProperty()
  photoUrl: string;

  @ApiProperty()
  brand: VehicleBrand;
}
