import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomDto } from './dto/rooms.dto';
import { PrismaService } from '../services/configs/prisma.service';
import { UsersInRoomDto } from './dto/users-in-room.dto';
import { selectRoomDataDto } from './dto/room-data.dto';
import { MessageDto } from './dto/wss/socket-room-messages.dto';
import { insertMessageProducerService } from 'src/jobs/messages/insert-message-producer.service';
import { SocketMessageService } from 'src/services/wss/socket-room-messages.service';
import { PrivateMessagesDTO } from './dto/wss/socket-private-messages.dto';



//@WebSocketGateway({ cors: true }) para habilitar o cors
@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private userAndRoom: UsersInRoomDto[] = [];
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() server: Server;

  constructor(
    private prismaService: PrismaService,
    private messageJobService: insertMessageProducerService,
    private messagesService: SocketMessageService
  ) { }

  @SubscribeMessage('find_messages')
  async findMessages(client: Socket, roomName: string): Promise<void> {
    const messages = await this.messagesService.findMessages(roomName);
    // Emita as mensagens de volta para todos os clientes na sala
    this.server.to(roomName).emit('all_messages', messages);
  }

  @SubscribeMessage("select_room")
  async selectRoom(roomName: string, client: Socket) {
    let room = await this.prismaService.chatRoom.findUnique({
      where: {
        name: roomName
      }
    })

    if (room) {
      client.join(roomName)
    } else {
      await this.prismaService.chatRoom.create({
        data: {
          name: roomName
        }
      });

      client.join(roomName);
    }
  }

  //quando o cliente mandar uma mensagem com o tipo message este metodo sera chamado
  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: MessageDto): Promise<void> {
    this.server.to(data.room).emit("message", data)

    this.messageJobService.insertMessage(data)
  }

  @SubscribeMessage('private message')
  async handlePrivateMessage(client: Socket, data: PrivateMessagesDTO): Promise<void> {
    this.server.to(data.to).emit("private message", {
        content: data.content,
        from: client.id
    })

    await this.messageJobService.insertPrivateMessage(data)
  }

  //depois que a conexão websocket é iniciada
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  //durante a conexão do usuario
  handleConnection(client: Socket) {
    const roomName = client.handshake.query.roomName as string;
    this.logger.log(`Client connected: ${client.id}`);
    this.selectRoom(roomName, client);
  }

  //durante a desconexão do usuario
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}