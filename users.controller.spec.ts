import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../prisma.service';

describe('UsersController', () => {
  let userService: UsersService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService, PrismaService],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it(`/GET users`, async () => {
    const users: UserEntity[] = [
      {
        user_id: 1,
        username: 'user1',
        email: 'Sonya@example.com',
        password: '0123456789',
        balance: 100,
        registration_date: new Date(),
        transactions: [],
      },
      {
        user_id: 2,
        username: 'user2',
        email: 'Sonya@example.com',
        password: '0123456789',
        balance: 100,
        registration_date: new Date(),
        transactions: [],
      },
    ];
    jest.spyOn(userService, 'findAll').mockResolvedValue(users);
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    const serializedUsers = users.map((user) => ({
      ...user,
      registration_date: user.registration_date.toISOString(),
    }));

    expect(response.body).toEqual(serializedUsers);
  });

  it(`/GET users/:id`, async () => {
    const users: UserEntity[] = [
      {
        user_id: 1,
        username: 'user1',
        email: 'Sonya@example.com',
        password: '0123456789',
        balance: 100,
        registration_date: new Date(),
        transactions: [],
      },
      {
        user_id: 2,
        username: 'user2',
        email: 'Sonya@example.com',
        password: '0123456789',
        balance: 100,
        registration_date: new Date(),
        transactions: [],
      },
    ];
    jest.spyOn(userService, 'getUserById').mockResolvedValue(users[0]);
    const response = await request(app.getHttpServer())
      .get(`/users/${users[0].user_id}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.user_id).toBe(1);
  });

  it(`/DELETE users/:id`, async () => {
    const users: UserEntity[] = [
      {
        user_id: 1,
        username: 'user1',
        email: 'Sonya@example.com',
        password: '0123456789',
        balance: 100,
        registration_date: new Date(),
        transactions: [],
      },
      {
        user_id: 2,
        username: 'user2',
        email: 'Sonya@example.com',
        password: '0123456789',
        balance: 100,
        registration_date: new Date(),
        transactions: [],
      },
    ];
    jest.spyOn(userService, 'deleteUser').mockResolvedValue(undefined);

    const response = await request(app.getHttpServer())
      .delete(`/users/${users[0].user_id}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });
});
