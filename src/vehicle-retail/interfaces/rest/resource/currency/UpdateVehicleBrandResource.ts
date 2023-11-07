import { ApiProperty } from "@nestjs/swagger";

export class UpdateCurrencyResource {
  @ApiProperty()
  name: string;
  @ApiProperty()
  symbol: string;
}
