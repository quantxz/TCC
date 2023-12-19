import { MessageDto } from "src/socket/dto/wss/socket-room-messages.dto";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class SocketMessageService {
    constructor(readonly prismaService: PrismaService) {}
    
    async saveMessage(data: MessageDto) {
        const message = await this.prismaService.messages.create({
            data: {
                author: data.author,
                content: data.content,
                room:   data.room
            }
        })
    }

    async deleteMessage(data: MessageDto) {
        const message = await this.prismaService.messages.delete({
            where: {
                author: data.author,
                room: data.room,
                content: data.content
            }
        }) 
        return message
    }
}