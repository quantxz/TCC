import { UploadsService } from './../files configurers/uploads/uploads.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from 'file-manager-3ds/dist/types/file-type';


/*
  create ✔
  findAll ✔
  findPostsOfAuthor ✔
  update ❌
  delete ✔
*/
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, private readonly uploadsService: UploadsService) { }
  public date = new Date();

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() postDto: Omit<CreatePostDto, "shippingTime">, @UploadedFile() file?: FileDto) {

    try {

      if (file) {
        const result = await this.uploadsService.filePipe(file);
        const postImageUrl = `${this.uploadsService.folderPath + "/" + result}`;

        const postDtoWithImage: CreatePostDto = {
          title: postDto.title,
          content: postImageUrl,
          shippingTime: this.date,
          userNickname: postDto.userNickname
        }

        const post = await this.postsService.create(postDtoWithImage);

        return post;
      } else {

        const postDtoWithoutImage: CreatePostDto = {
          title: postDto.title,
          content: postDto.content,
          shippingTime: this.date,
          userNickname: postDto.userNickname
        }

        const post = await this.postsService.create(postDtoWithoutImage);

        return post;
      }
    } catch (error) {
      throw new Error(`\nError finded:\n${error}\n`)
    }

  }

  @Get('get-all')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('find-posts-of-author/:author')
  findOne(@Param('author') author: string) {
    if(author) {
      return this.postsService.findPostsOfAuthor(author);
    } else {
      throw new BadRequestException("O parâmetro de consulta 'author' é necessário");
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  @Delete('delete')
  remove(@Body() postDto: CreatePostDto) {
    return this.postsService.remove(postDto);
  }
}
