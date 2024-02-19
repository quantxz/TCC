import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/services/configs/prisma.service';
import { RedisService } from 'src/services/configs/redis.service';
 
@Module({
  controllers: [UsersController],
  providers: [UserService,  PrismaService, RedisService],
})
export class UsersModule {}
