import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { PrivateMessagesDTO } from "src/socket/dto/wss/socket-private-messages.dto";
import { MessageDto } from "src/socket/dto/wss/socket-room-messages.dto";

@Injectable()
export class insertMessageProducerService {
    constructor(@InjectQueue('insert-message') private queue: Queue) { }

    async insertMessage(message: MessageDto) {
        await this.queue.add("insertMessage-Job", message);
    }

    async insertPrivateMessage(message: PrivateMessagesDTO) {
        await this.queue.add("insertPrivateMessage-Job", message);
    }

}