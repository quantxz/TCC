import { MessageDto } from "src/socket/dto/wss/socket-room-messages.dto";
import { PrismaService } from "../configs/prisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { PrivateMessagesDTO } from "src/socket/dto/wss/socket-private-messages.dto";


@Injectable()
export class SocketMessageService {
    constructor(readonly prismaService: PrismaService) { }
    private logger: Logger = new Logger('AppGateway');
    async saveMessages(data: MessageDto[]) {
        for (let message of data) {
            const checker = await this.prismaService.messages.findMany({
                where: {
                    author: message.author,
                    content: message.content,
                    room: message.room,
                    hour: message.hour
                }
            })

            if (checker.length == 0) continue;

            await this.prismaService.messages.create({
                data: {
                    author: message.author,
                    content: message.content,
                    room: message.room,
                    hour: message.hour
                }
            })
        }
    }

    async saveMessage(data: MessageDto) {
        const checker = await this.prismaService.messages.findMany({
            where: {
                author: data.author,
                content: data.content,
                room: data.room,
                hour: data.hour
            }
        })

        if (checker.length !== 0) return;

        await this.prismaService.messages.create({
            data: {
                author: data.author,
                content: data.content,
                room: data.room,
                hour: data.hour
            }
        })
    }



    async savePrivateMessage(data: PrivateMessagesDTO) {
        const message = await this.prismaService.privateMessages.create({
            data: {
                author: data.author,
                content: data.content,
                to: data.to
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