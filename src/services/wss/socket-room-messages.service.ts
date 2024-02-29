import { MessageDto } from "src/socket/dto/wss/socket-room-messages.dto";
import { PrismaService } from "../configs/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrivateMessagesDTO } from "src/socket/dto/wss/socket-private-messages.dto";


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

        return message
    }
    
    async savePrivateMessage(data: PrivateMessagesDTO) {
        const message = await this.prismaService.privateMessages.create({
            data: {
                author: data.author,
                content: data.content,
                to:   data.to
            }
        })

        return message
    }

    async findMessages(roomName: string) {
        const messages = await this.prismaService.messages.findMany({
            where: {
                room: roomName
            }
        });

        return messages;
    }

    async deleteMessage(data: MessageDto) {
        const message = await this.prismaService.messages.delete({
            where: {
                id: data.id
            }
        }) 
        return message
    }
}