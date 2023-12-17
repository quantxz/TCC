import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SocketGateway } from './socket/socket.gateway';


@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule {}
