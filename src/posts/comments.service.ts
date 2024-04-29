import { PrismaService } from "src/services/configs/prisma.service";
import { CommentDto } from "./dto/create-comment.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommentsService {

    constructor(private readonly prismaService: PrismaService) { }
    
    async create(commentDto: CommentDto) {
        const comment = await this.prismaService.comments.create({
            data: {
                content: commentDto.content,
                authorNick: commentDto.authorNick,
                postId: commentDto.postId
            }
        });

        return comment
    }
}