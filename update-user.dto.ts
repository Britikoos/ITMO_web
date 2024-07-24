import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    type: String,
    example: 'Britikova Eliza',
  })
  name: string;

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

  @ApiProperty({
    description: 'balance',
    type: Number,
    example: 100.0,
  })
  balance: number;

  @ApiProperty({
    description: 'registration_date',
    type: Date,
    example: new Date(),
  })
  registration_date: Date;

  constructor(name: string, email: string, password: string, balance: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.balance = balance;
    this.registration_date = new Date();
  }
}
