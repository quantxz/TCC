import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomDto } from './dto/rooms.dto';
import { PrismaService } from 'src/services/prisma.service';
import { UsersInRoomDto } from './dto/users-in-room.dto';
import { selectRoomDataDto } from './dto/room-data.dto';

//@WebSocketGateway({ cors: true }) para habilitar o cors
@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private users: UsersInRoomDto[] = [];
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() server: Server;

  constructor(private prismaService: PrismaService) {}

  @SubscribeMessage("select_room")
  async selectRoom(client: Socket, data: selectRoomDataDto): Promise<void> {
      client.join(data.room)
      
      const userInRoom = this.users.find(user => user.user === data.user && user.room === data.room)

      if (userInRoom) {
        userInRoom.socket_id = client.id
      } else {
          this.users.push({
            room: data.room,
            user: data.nickname,
            socket_id: client.id
          })
      }

  }
  
  //quando o cliente mandar uma mensagem com o tipo message este metodo sera chamado
  @SubscribeMessage('message')
  handleMessage(client: Socket, data): void {
    console.log(this.users.find(user => user.room == data.room))
    this.server.to(data.room).emit("message", data.payload)
  }

  //depois que a conexão websocket é iniciada
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  //durante a conexão do usuario
  handleConnection(client: Socket) {
    this.logger.log( `Client connected: ${client.id}`);
  }

  //durante a desconexão do usuario
  handleDisconnect(client: Socket) {
    this.logger.log( `Client disconnected: ${client.id}`);
  }
}