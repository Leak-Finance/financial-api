import {ApiProperty} from "@nestjs/swagger";

export class CreateBuyQueryDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  parameters: any;
}
