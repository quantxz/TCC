import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { PrismaService } from '../services/configs/prisma.service';
import { RedisService } from '../services/configs/redis.service';
import { UserDto } from './dto/user.dto';

describe('UsersService', () => {
  let service: UserService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn().mockResolvedValue(UserDto),
            findMany: jest.fn(),
            findUnique: jest.fn().mockResolvedValue(UserDto),
            update: jest.fn().mockResolvedValue(UserDto),
            delete: jest.fn().mockResolvedValue(UserDto),
          },
        },
        {
          provide: RedisService,
          useValue: {
            get: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
