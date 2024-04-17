import { UploadsService } from './../files configurers/uploads/uploads.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesManager } from 'file-manager-3ds';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from 'file-manager-3ds/dist/types/file-type';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, private readonly uploadsService: UploadsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() postDto: CreatePostDto, @UploadedFile() file?: FileDto) {

    if (file) {
      const result = await this.uploadsService.filePipe(file);
      const postImageUrl = `${this.uploadsService.folderPath + "/" + result}`;
      
      const date = new Date()

      const postDtoWithImage: CreatePostDto = {
        title: postDto.title,
        content: postImageUrl,
        shippingTime: date,
        userNickname: postDto.userNickname
      }

      const post = await this.postsService.create(postDtoWithImage);
      
      return post;
    } else {
      const date = new Date()

      const postDtoWithoutImage: CreatePostDto = {
        title: postDto.title,
        content: postDto.content,
        shippingTime: date,
        userNickname: postDto.userNickname
      }

      const post = await this.postsService.create(postDtoWithoutImage);
      
      return post;
    }

  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
