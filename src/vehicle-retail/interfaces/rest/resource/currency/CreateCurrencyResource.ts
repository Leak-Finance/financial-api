import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyResource {
  @ApiProperty()
  name: string;
  @ApiProperty()
  symbol: string;
}
