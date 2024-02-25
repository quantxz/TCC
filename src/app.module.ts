import { InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SocketGateway } from './socket/socket.gateway';
import { PrismaService } from './services/configs/prisma.service';
import { SocketRoomService } from './services/wss/socket-room.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { sendEmailProducerService } from './jobs/mail/sendEmail-producer.service';
import { insertMessageProducerService } from './jobs/messages/insert-message-producer.service';
import { insertMessageConsumer } from './jobs/messages/insert-message-consumer';
import { SocketMessageService } from './services/wss/socket-room-messages.service';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from "bull-board/bullAdapter"

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
    }),
    BullModule.registerQueue({
      name: "insert-message"
    })
  ],
  controllers: [],
  providers: [SocketGateway, SocketRoomService, PrismaService, sendEmailProducerService, insertMessageProducerService,insertMessageConsumer, SocketMessageService],
})
export class AppModule {
  constructor(@InjectQueue('insert-message') private queue: Queue) { }

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.queue)
    ])

    consumer.apply(router).forRoutes("/admin/queues/messages")
  }
} 