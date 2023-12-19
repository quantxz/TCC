import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SocketGateway } from './socket/socket.gateway';
import { PrismaService } from './services/prisma.service';
import { SocketRoomService } from './services/wss/socket-room.service';


@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [SocketGateway, SocketRoomService, PrismaService],
})
export class AppModule {}
