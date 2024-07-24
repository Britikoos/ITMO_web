import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'email',
    type: String,
    example: 'cap.britikos@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'password',
    type: String,
    example: '1234567890',
  })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
