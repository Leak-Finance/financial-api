import { ApiProperty } from "@nestjs/swagger";

export class CurrencyResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;
}
