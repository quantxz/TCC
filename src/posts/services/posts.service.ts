import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PrismaService } from 'src/services/configs/prisma.service';

@Injectable()
export class PostsService {
  private logger: Logger = new Logger('PostsController Service');
  constructor(private readonly prismaService: PrismaService) { }

  async create(postDto: CreatePostDto) {
    try {
      const post = await this.prismaService.posts.create({
        data: {
          title: postDto.title,
          content: postDto.content,
          author: postDto.userNickname,
        }
      })

      return post
    } catch (error) {
      this.logger.error(error)
    }
  }

  async findAll() {
    try {
      const post = await this.prismaService.posts.findMany();

      return post
    } catch (error) {
      this.logger.error(error)
    }
  }

  async findPostsOfAuthor(author: string) {
    try {
      const post = await this.prismaService.posts.findMany({
        where: {
          author
        }
      })

      return post
    } catch (error) {
      this.logger.error(error)
    }

  }

  async remove(postDto: CreatePostDto) {
    try {
      const post = await this.prismaService.posts.findFirst({
        where: {
          author: postDto.userNickname,
          title: postDto.title,
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
    } catch (error) {
      this.logger.error(error)
    }
  }

}