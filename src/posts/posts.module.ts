import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UploadsService } from 'src/files configurers/uploads/uploads.service';
import { PrismaService } from 'src/services/configs/prisma.service';
import { CommentsService } from './comments.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UploadsService, PrismaService, CommentsService],
})
export class PostsModule {}
