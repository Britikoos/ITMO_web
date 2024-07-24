import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create new User' })
  @ApiOkResponse({ status: 201, description: 'Successfully сreated' })
  @ApiBadRequestResponse({ status: 404, description: 'Bad Request' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({ status: 201, description: 'User updated successfully' })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Incorrect request arguments',
  })
  @ApiNotFoundResponse({ description: 'Nonexistent User' })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Get user by user_id'})
  @ApiOkResponse({
    status: 201,
    description: 'Successfully got',
    type: [UserEntity],
  })
  @ApiBadRequestResponse({ status: 404, description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Nonexistent User' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return await this.userService.getUserById(parseInt(userId, 10));
  }

  @ApiOkResponse({
    description: 'All Users have been found',
    type: [UserEntity],
  })
  @ApiNotFoundResponse({
    description: 'No Users in the system',
  })
  @ApiQuery({ required: false })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Delete User by user_id' })
  @ApiOkResponse({ status: 201, description: 'Successfully delete' })
  @ApiBadRequestResponse({ status: 404, description: 'Bad Request' })
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    await this.userService.deleteUser(parseInt(userId, 10));
  }
}
