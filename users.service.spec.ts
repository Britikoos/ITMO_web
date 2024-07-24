import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { PrismaService } from '../prisma.service';

describe('UsersService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UsersService;
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      expect(await controller.findAll()).toEqual([]);
    });
  });
});
