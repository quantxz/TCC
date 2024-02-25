import { Injectable } from "@nestjs/common";
import { PrismaService } from "../configs/prisma.service";
import { RoomDto } from "src/socket/dto/rooms.dto";

@Injectable()
export class SocketRoomService {
    
    constructor(private readonly prismaService: PrismaService) {}
    
    async createRoom(data: RoomDto) {
        const createdRooms = await this.prismaService.chatRoom.findUnique({
            where: {
                name: data.name
            }
        })
        
        if(!createdRooms) {
            const rooms: RoomDto = await this.prismaService.chatRoom.create({
                data: {
                    name: data.name
                }
            })
            return rooms
        } else {
            return "room name already exist"
        }
    }

    async updateRoomName(data: RoomDto) {
        const room = await this.prismaService.chatRoom.update({
            where: {
                name: data.name
            }, data: {
                name: data.name
            }
        })

        return room
    }

}