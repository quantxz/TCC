import { UploadsService } from '../../files configurers/uploads/uploads.service';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from 'file-manager-3ds/dist/types/file-type';
import { PostsAtributesService } from '../services/posts-atributes.service';
import { CommentDto } from '../dto/posts-atributes.dto';
import { PostsAtributes } from './posts-atributes.controller';
import { Response } from 'express';


/*
  create ✔
  findAll ✔
  findPostsOfAuthor ✔
  update ❌
  delete ✔
*/
@Controller('posts')
export class PostsController extends PostsAtributes {
  constructor(
    private readonly postsService: PostsService,
    readonly uploadsService: UploadsService,
    readonly postsAtributesService: PostsAtributesService
  ) {
    super(postsAtributesService, uploadsService)
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() postDto: Omit<CreatePostDto, "shippingTime">, @Res() res: Response, @UploadedFile() file?: FileDto) {

    try {

      if (file) {
        const result = await this.uploadsService.filePipe(file);
        const postImageUrl = `${this.uploadsService.folderPostsPath + "/" + result}`;

        const postDtoWithImage: CreatePostDto = {
          title: postDto.title,
          content: postImageUrl,
          userNickname: postDto.userNickname
        }

        const post = await this.postsService.create(postDtoWithImage);

      } else {

        const postDtoWithoutImage: CreatePostDto = {
          title: postDto.title,
          content: postDto.content,
          userNickname: postDto.userNickname
        }

        const post = await this.postsService.create(postDtoWithoutImage);

      }
      return res.status(200).json({
        message: 'Requisição bem sucedida',
        status: 200,
      });
    } catch (error) {
    
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }

  }

  @Get('get-all')
  findAll() {
    try {
      return this.postsService.findAll();
    } catch (error) {
      throw new BadRequestException("o seguinte erro ocorreu: " + error);
    }
  }

  @Get('find-posts-of-author/:author')
  findByAuthor(@Param('author') author: string) {
    try {
      if (author) {
        return this.postsService.findPostsOfAuthor(author);
      } else {
        throw new BadRequestException("O parâmetro de consulta 'author' é necessário");
      }
    } catch (error) {
      throw new BadRequestException("o seguinte erro ocorreu: " + error);
    }
  }

  @Get('post/:id')
  findUnique(@Param('id') id: string) {
    try {
      return this.postsService.findUnique(id);
    } catch (error) {
      throw new BadRequestException("o seguinte erro ocorreu: " + error);
    }
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  @Delete('delete')
  remove(@Body() postDto: CreatePostDto) {
    try {
      return this.postsService.remove(postDto);
    } catch (error) {
      throw new BadRequestException("o seguinte erro ocorreu: " + error);
    }
  }
}
