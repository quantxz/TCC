import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { UploadsService } from 'src/files configurers/uploads/uploads.service';
import { PrismaService } from 'src/services/configs/prisma.service';
import { PostsAtributesService } from './services/posts-atributes.service';
import { UserService } from 'src/users/users.service';
import { PostsFamousService } from './services/famous-posts.service';
import { PostsFamousController } from './controllers/famous-posts-controller';

@Module({
  controllers: [PostsController, PostsFamousController],
  providers: [PostsService, UploadsService, PrismaService, PostsAtributesService, UserService, PostsFamousService],
})
export class PostsModule {}
