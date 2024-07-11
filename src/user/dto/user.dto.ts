import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
