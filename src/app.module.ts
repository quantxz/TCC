import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SocketGateway } from './socket/socket.gateway';
import { PrismaService } from './services/configs/prisma.service';
import { SocketRoomService } from './services/wss/socket-room.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { sendEmailProducerService } from './jobs/sendEmail-producer.service';

@Module({
  imports: [
    UsersModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      }
    }),
    BullModule.registerQueue({
      name: "mail-Queue"
    })
  ],
  controllers: [],
  providers: [SocketGateway, SocketRoomService, PrismaService, sendEmailProducerService],
})
export class AppModule { } 