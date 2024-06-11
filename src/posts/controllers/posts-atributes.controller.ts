import { UploadsService } from '../../files configurers/uploads/uploads.service';
import { Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Query, Res, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from 'file-manager-3ds/dist/types/file-type';
import { CommentDto, LikedsPostsDto } from '../dto/posts-atributes.dto';
import { PostsAtributesService } from '../services/posts-atributes.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Response } from 'express';

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
  async like(
    @Body() dto: CreatePostDto,
    @Query('type') type: string,
    @Query('reqType') reqType: string,
    @Res() res: Response
  ) {
    try {
      switch (reqType) {
        case "like":
          const like = await this.postsAtributesService.like(type, dto);
          return res.status(200).json({
            message: "post curtido"
          });
        case "unlike":
          const unlike = await this.postsAtributesService.unlike(type, dto);
          return res.status(200).json({
            message: "like removido"
          });
        default:
          return res.status(400).json({
            error: "o tipo de requisição deve ser 'like' ou 'unlike'"
          })
      }
    } catch (error) {
      return res.status(500).json({
        error: "o seguinte erro ocorreu: " + error.message
      });
    }
  }

  @Patch('likedPosts')
  async updateLikedPosts(@Body() dto: LikedsPostsDto, @Query('type') type: string, @Res() res: Response) {
    console.log(dto)
    try {
      const likedPost = await this.postsAtributesService.UpdatePostLiked(dto, type)

      return res.status(200).json({
        message: "like posts status updated",
        status: 200,
        postInfo: likedPost
      })
    } catch (error) {
      return res.status(400).json({
        message: "erro na soliçitação"
      })
    }
  }

  @Post('likedPosts')
  async findLikedPosts(@Body() dto: LikedsPostsDto, @Res() res: Response) {
    try {
      const likedPost = await this.postsAtributesService.findUserPostLiked(dto)

      if(likedPost) {
        return res.status(200).json({
          message: "returning user liked post",
          status: 200,
          postLiked: true,
          postInfo: likedPost
        })
      } else {
        return res.status(200).json({
          message: "returning user liked post",
          status: 200,
          postStatus: false,
          postInfo: likedPost
        })
      }
    } catch (error) {
      return res.status(400).json({
        message: "erro na soliçitação"
      })
    }
  }
}