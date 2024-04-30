import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { UploadsService } from 'src/files configurers/uploads/uploads.service';
import { PrismaService } from 'src/services/configs/prisma.service';
import { PostsAtributesService } from './services/posts-atributes.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UploadsService, PrismaService, PostsAtributesService],
})
export class PostsModule {}
