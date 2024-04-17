import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/services/configs/prisma.service';

@Injectable()
export class PostsService {

  constructor(private readonly prismaService: PrismaService) {}
  
  create(postDto: CreatePostDto) {
    const post = this.prismaService.posts.create({
      data: {
        title: postDto.title,
        content: postDto.content,
        author: postDto.userNickname,
        shippingTime: postDto.shippingTime
      }
    })

    return post
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
