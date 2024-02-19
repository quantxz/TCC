import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomDto } from './dto/rooms.dto';
import { PrismaService } from 'src/services/configs/prisma.service';
import { UsersInRoomDto } from './dto/users-in-room.dto';
import { selectRoomDataDto } from './dto/room-data.dto';
import { MessageDto } from './dto/wss/socket-room-messages.dto';



//@WebSocketGateway({ cors: true }) para habilitar o cors
@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private userAndRoom: UsersInRoomDto[] = [];
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() server: Server;

  constructor(private prismaService: PrismaService) {}

  @SubscribeMessage("select_room")
  async selectRoom(data: selectRoomDataDto, client?: Socket): Promise<void> {
      /*
        o codigo esta certo o problema é a permanencia do socket do usuario no front end
        que muda quando ele passa da aba de seleção para a aba do chat o que faz com que o 
        socket usado para conectar o client no select_room seja diferente do socket do mesmo 
        usuario na aba do chat  
      */
      client.join(data.room)
  }
  
  //quando o cliente mandar uma mensagem com o tipo message este metodo sera chamado
  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: MessageDto | any): Promise<void> {
    this.selectRoom(data.room)
    this.server.to(data.room).emit("message", data.payload)
    
    await this.prismaService.messages.create({
      data: {
        author: data.user,
        content: data.payload,
        room: data.room
      }
    })
     
  }

  @SubscribeMessage('private_message')
  handlePrivateMessage(client: Socket, data): void {
    client.join(data.room)
    console.log(data)
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