import { PrismaService } from "src/services/configs/prisma.service";
import { CommentDto, LikeDto, LikeInCommentDto, LikedsPostsDto } from "../dto/posts-atributes.dto";
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

    async findUserPostLiked(data: LikedsPostsDto) {
        const likedPost = await this.prismaService.likedsPosts.findFirst({
            where: {
                author: data.author,
                postId: data.postId
            }
        });

        return {
            booleanValue: !!likedPost,
            likedPostMetadata: likedPost || {
                id: null,
                author: null,
                postId: null
            }
        };
    }

    async UpdatePostLiked(data: LikedsPostsDto, type: string) {

        switch(type) {
            case "like":
                const likedPost = await this.prismaService.likedsPosts.create({
                    data: {
                        author: data.author,
                        postId: data.postId
                    }
                });
        
                return likedPost
            case "unlike":
                const unlikedPost = await this.prismaService.likedsPosts.delete({
                    where: {
                        id: data.id
                    }
                });
                console.log("LIkedpost Deletado")
                return unlikedPost
            default:
                throw new Error("Tipo não permitido")
        }

    }

    async like(likeWhat: string, dto: CreatePostDto) {
        try {
            let currentLike;

            switch (likeWhat) {
                case "Post":
                    currentLike = await this.prismaService.posts.findUnique({
                        where: { id: dto.id }
                    })

                    const post = await this.prismaService.posts.update({
                        where: { id: dto.id },
                        data: { likes: Math.round(currentLike.likes + 1) }
                    })

                    return post

                case "Comment":
                    currentLike = await this.prismaService.comments.findUnique({
                        where: { id: dto.id }
                    })

                    const comment = await this.prismaService.comments.update({
                        where: { id: dto.id },
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

    async unlike(unlikeWhat: string, dto: CreatePostDto) {
        try {

            let currentLike;

            switch (unlikeWhat) {
                case "Post":
                    currentLike = await this.prismaService.posts.findUnique({
                        where: { id: dto.id }
                    })

                    const post = await this.prismaService.posts.update({
                        where: { id: dto.id },
                        data: { likes: Math.round(currentLike.likes - 1) }
                    })

                    return post

                case "Comment":
                    currentLike = await this.prismaService.comments.findUnique({
                        where: { id: dto.id }
                    })

                    const comment = await this.prismaService.comments.update({
                        where: { id: dto.id },
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