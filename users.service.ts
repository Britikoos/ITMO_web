import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        balance: 100,
        registration_date: new Date(),
      },
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    const user: User = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (user == null) {
      throw new NotFoundException('Nonexistent User');
    }

    return {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      balance: user.balance,
      registration_date: user.registration_date,
      password: user.password,
    };
  }

  async getOneByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user == null) {
      throw new NotFoundException('Nonexistent User');
    }

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.user.update({
        data: {
          email: updateUserDto.email,
          balance: updateUserDto.balance,
          registration_date: updateUserDto.registration_date,
          password: updateUserDto.password,
        },
        where: {
          user_id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }
  async deleteUser(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
  }
}
