import { PrismaService } from "src/services/configs/prisma.service";
import { CommentDto, LikeDto, LikeInCommentDto } from "../dto/posts-atributes.dto";
import { Injectable, Logger } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class PostsAtributesService {
    private logger: Logger = new Logger('PostsAtributes Service');
    constructor(private readonly prismaService: PrismaService) { }

    async createComment(commentDto: CommentDto) {
        try {
            const comment = await this.prismaService.comments.create({
                data: {
                    content: commentDto.content,
                    authorNick: commentDto.authorNick,
                    postId: commentDto.postId
                }
            });

            return comment
        } catch (error) {
            this.logger.error(error)
        }
    }

    async like<T extends { id?: string }>(enjoyWhat: string, DTO?: T) {
        try {

            if (!DTO || !DTO.id) {
                throw new Error("O parâmetro DTO ou DTO.id não pode ser nulo.");
            }


            let currentLike;

            switch (enjoyWhat) {
                case "Post":
                    currentLike = await this.prismaService.posts.findUnique({
                        where: { id: DTO.id }
                    })

                    const post = await this.prismaService.posts.update({
                        where: { id: DTO.id },
                        data: { likes: Math.round(currentLike.likes + 1) }
                    })

                    return post

                case "Comment":
                    currentLike = await this.prismaService.comments.findUnique({
                        where: {
                            id: DTO.id
                        }
                    })

                    const comment = await this.prismaService.comments.update({
                        where: { id: DTO.id },
                        data: {
                            likes: Math.round(currentLike.likes + 1)
                        }
                    })

                    return comment
                default:
                    throw new Error("é nescessario passar um parametro valido")
            }
        } catch (error) {
            this.logger.error(error)
        }
    }
}