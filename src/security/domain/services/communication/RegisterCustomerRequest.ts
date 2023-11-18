import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, Matches, MaxLength, MinLength} from "class-validator";


export class RegisterCustomerRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/^(?=.*\d)(?=.*[@!#$%^&*(),.?":{}|<>]).*$/, {
    message: 'Password must contain at least one number and one symbol',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  dni: number;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  photoUrl: string;
}
