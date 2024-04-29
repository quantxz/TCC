import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/services/configs/prisma.service';

@Injectable()
export class PostsService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(postDto: CreatePostDto) {
    const post = await this.prismaService.posts.create({
      data: {
        title: postDto.title,
        content: postDto.content,
        author: postDto.userNickname,
        shippingTime: postDto.shippingTime
      }
    })

    return post
  }

  async findAll() {
    const post = await this.prismaService.posts.findMany();

    return post
  }

  async findPostsOfAuthor(author: string) {
    const post = await this.prismaService.posts.findMany({
      where: {
        author
      }
    })

    return post

  }

  async remove(postDto: CreatePostDto) {
    const post = await this.prismaService.posts.findFirst({
      where: {
        author: postDto.userNickname,
        title: postDto.title,
        shippingTime: postDto.shippingTime,
        content: postDto.content
      }
    })

    if (!post) {
      throw new Error('Post not found');
    }

    const postDeleted = this.prismaService.posts.delete({
      where: {
        id: post.id
      }
    })

    return postDeleted
  }

}