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
import { PostDto } from '../dto/post.dto';


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
        const postImageUrl = `${"http://localhost:3000/" + result}`;

        const postDtoWithImage: CreatePostDto = {
          title: postDto.title,
          content: postImageUrl,
          userNickname: postDto.userNickname
        }

        const post = await this.postsService.create(postDtoWithImage);

      } else {
        console.log("postDto")
        console.log(postDto) 
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
  async findAll(@Res() res: Response) {
    try {
      const posts = await this.postsService.findAll();

      // If postsService.findAll() returns an array of posts
      const postsAttributesPromises = posts.map(async (post) => {
        const obj = {
          author: post.author,
          postId: post.id
        };
        return await this.postsAtributesService.findUserPostLiked(obj);
      });

      const postsAttributes = await Promise.all(postsAttributesPromises);

      // You can modify the posts array to include the attributes if needed
      const postsWithAttributes = posts.map((post, index) => ({
        ...post,
        attributes: postsAttributes[index]
      }));

      return res.status(200).json(postsWithAttributes); // Properly using the response object
    } catch (error) {
      console.error("An error occurred:", error); // Logging the error for debugging
      throw new BadRequestException("An error occurred: " + error.message); // Providing a meaningful error message
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
