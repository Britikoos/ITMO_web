import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    type: String,
    example: 'Eliza',
  })
  username: string;

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

  constructor(name: string, email: string, password: string) {
    this.username = name;
    this.email = email;
    this.password = password;
  }
}
