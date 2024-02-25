// import { Controller, Get, Post, Query } from '@nestjs/common';
// import { SocketGateway } from '../socket.gateway';

// @Controller('socket')
// export class SocketController {
//     constructor(private readonly gateway: SocketGateway) { }
    
//     @Post("chat")
//     async room(@Query("room") roomName: string, @Query("privacy") privacy: string) {
//         this.gateway.selectRoom(roomName)
//         return "ok"
//     }
// }
