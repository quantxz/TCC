import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { SocketMessageService } from "src/services/wss/socket-room-messages.service";
import { PrivateMessagesDTO } from "src/socket/dto/wss/socket-private-messages.dto";
import { MessageDto } from "src/socket/dto/wss/socket-room-messages.dto";

//injeta este codigo no sendEmailservice
@Processor('insert-message')
export class insertMessageConsumer {
    constructor(private messagesService: SocketMessageService) { }

    // @Process('insertMessage-Job')
    // async insertMessageJob(job: Job<MessageDto>) { 
    //     console.log(job.data)
    //     await this.messagesService.saveMessage(job.data)
    // }

    @Process('insertPrivateMessage-Job')
    async insertPrivateMessageJob(job: Job<PrivateMessagesDTO>) { 
        console.log(job.data)
        await this.messagesService.savePrivateMessage(job.data)
    }

    @OnQueueFailed()
    onFailed(job: Job) {
        console.log(`on failed ${job.data}`)
    }
}