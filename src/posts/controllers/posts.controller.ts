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
import { Posts } from '@prisma/client';
import { PostDto } from '../dto/post.dto';
import { UserService } from 'src/users/users.service';


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
    readonly postsAtributesService: PostsAtributesService,
    readonly userService: UserService
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

      // Recuperando os dados dos autores para cada post
      const postsAttributesPromises = posts.map(async (post) => {
        const obj = {
          author: post.author,
          postId: post.id,
        };

        // Buscar atributos relacionados ao post (como likes) e também dados do autor
        const postAttributes = await this.postsAtributesService.findUserPostLiked(obj);
        const user = await this.userService.findByNickname(post.author); // Buscar o autor pelo nickname
     
        return {
          attributes: postAttributes,
          authorName: `${user.name}`
        };
      });

      const postsAttributes = await Promise.all(postsAttributesPromises);

      // Incluir o nome do autor e outros atributos nos posts
      const postsWithAttributes = posts.map((post, index) => ({
        ...post,
        authorName: postsAttributes[index].authorName, // Adiciona o nome do autor
        attributes: postsAttributes[index].attributes,
        name: postsAttributes[index].authorName // Atributos do post, como likes
      }));

      return res.status(200).json(postsWithAttributes); // Retornar os posts com os novos dados
    } catch (error) {
      console.error("An error occurred:", error); // Logar o erro para debugging
      throw new BadRequestException("An error occurred: " + error.message); // Mensagem de erro
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
