import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/services/configs/prisma.service';
import { RedisService } from 'src/services/configs/redis.service';
import { sendEmailProducerService } from 'src/jobs/sendEmail-producer.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { sendMailConsumer } from 'src/jobs/sendEmail-consumer';
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
  providers: [UserService,  PrismaService, RedisService, sendEmailProducerService, sendMailConsumer],
})
export class UsersModule {}
