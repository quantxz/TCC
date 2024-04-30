import { UploadsService } from '../../files configurers/uploads/uploads.service';
import { Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from 'file-manager-3ds/dist/types/file-type';
import { CommentDto } from '../dto/posts-atributes.dto';
import { PostsAtributesService } from '../services/posts-atributes.service';
import { CreatePostDto } from '../dto/create-post.dto';

export class PostsAtributes {

  constructor(
    protected readonly postsAtributesService: PostsAtributesService,
    protected readonly uploadsService: UploadsService
  ) { }

  @Post('comments')
  @UseInterceptors(FileInterceptor("file"))
  async comment(@Body() commentDto: CommentDto, @UploadedFile() file: FileDto) {
    try {
      if (file) {
        const result = await this.uploadsService.filePipe<"Comment">(file);
        const commentImageUrl = `${this.uploadsService.folderCommentsPath + "/" + result}`;

        const data: CommentDto = {
          content: commentImageUrl,
          authorNick: commentDto.authorNick,
          postId: commentDto.postId
        }

        const comment = await this.postsAtributesService.createComment(data);

        return comment;
      } else {
        const comment = await this.postsAtributesService.createComment(commentDto);

        return comment;
      }
    } catch (error) {
      throw new BadRequestException("o seguinte erro ocorreu: " + error);
    }

  }

  @Patch('likes')
  async like(@Body() DTO: CommentDto | CreatePostDto, @Query('type') type: string) {
    try {
      const like = await this.postsAtributesService.like(type, DTO);
      return like;
    } catch (error) {
      throw new BadRequestException("o seguinte erro ocorreu: " + error);
    }
  }
}