import { PrismaService } from "src/services/configs/prisma.service";
import { CommentDto, LikeDto, LikeInCommentDto, LikedsPostsDto } from "../dto/posts-atributes.dto";
import { Injectable, Logger } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class PostsFamousService {
    private logger: Logger = new Logger('PostsAtributes Service');
    constructor(private readonly prismaService: PrismaService) { }

    async getTopPosts() {
        const topPosts = await this.prismaService.posts.findMany({
            orderBy: {
                likes: 'desc', // Ordena por likes de forma decrescente
            },
            take: 50, // Limita a 10 posts
        });

        const postWithUser = await Promise.all(topPosts.map(async (post) => {
            const user = await this.prismaService.user.findUnique({
                where: {
                    nickname: post.author
                }
            })
            return ({
                ...post,
                user
            })
        }))

        return postWithUser;
    }

}