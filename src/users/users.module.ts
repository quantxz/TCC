import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../services/configs/prisma.service';
import { RedisService } from '../services/configs/redis.service';
import { sendEmailProducerService } from '../jobs/mail/sendEmail-producer.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { sendMailConsumer } from '../jobs/mail/sendEmail-consumer';
import { emailBodyRender } from '../jobs/mail/body/html-body';
@Module({
  controllers: [UsersController, ],
  imports: [
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
  providers: [
    UserService,  
    PrismaService, 
    sendEmailProducerService, 
    sendMailConsumer
  ],
})
export class UsersModule {}
