import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UploadsService } from 'src/files configurers/uploads/uploads.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UploadsService],
})
export class PostsModule {}
