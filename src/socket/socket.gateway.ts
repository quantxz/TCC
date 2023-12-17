import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');


  //@WebSocketGateway({ cors: true }) para habilitar o cors
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    console.log(payload)
    this.server.emit('messageToClient', payload, client.id);
  }

  //depois que a conexão websocket é iniciada
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  //durante a conexão do usuario
  handleConnection(client: Socket) {
    this.logger.log( `Client connected: ${client.id}`);
    this.server.emit('messageToClient');
  }

  //durante a desconexão do usuario
  handleDisconnect(client: Socket) {
    this.logger.log( `Client disconnected: ${client.id}`);
  }
}