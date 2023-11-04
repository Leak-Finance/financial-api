import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Matches, MaxLength, MinLength} from "class-validator";


export class RegisterEmployeeRequest {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/^(?=.*\d)(?=.*[@!#$%^&*(),.?":{}|<>]).*$/, {
    message: 'Password must contain at least one number and one symbol',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
}