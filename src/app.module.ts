import { InjectQueue } from '@nestjs/bull';
import { Module, NestModule } from '@nestjs/common';
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
import { TokenController } from './auth/tokens/token.controller';
import { FakeDataBase } from './auth/entitys/db';
import { TokenGenerator } from './auth/tokens/token-gen';
import { AuthMiddleware } from './auth/middleware/AuthMiddleware';
import { UsersController } from './users/users.controller';
import { TokenAuthentication } from './auth/middleware/TokenAuthentication';
import { PostsModule } from './posts/posts.module';
import { UploadsModule } from './modules/uploads/uploads.module';

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
    }),
    PostsModule,
    UploadsModule
  ],
  controllers: [TokenController],
  providers: [
    SocketGateway, 
    SocketRoomService, 
    PrismaService,  
    sendEmailProducerService, 
    insertMessageProducerService,
    insertMessageConsumer, 
    SocketMessageService,
    FakeDataBase,
    TokenGenerator,
    TokenAuthentication
  ],
})
export class AppModule implements NestModule {
  constructor(@InjectQueue('insert-message') private messagesQueue: Queue, @InjectQueue('mail-Queue') private sendMailQeue: Queue) { }
  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([
      new BullAdapter(this.messagesQueue),
      new BullAdapter(this.sendMailQeue)
    ])

    consumer.apply(router).forRoutes("/admin/queues/messages")
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
} 