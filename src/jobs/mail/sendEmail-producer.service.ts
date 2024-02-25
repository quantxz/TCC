import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class sendEmailProducerService {
    constructor(@InjectQueue('mail-Queue') private queue: Queue) { }

    async sendMail(createUser: CreateUserDto) {
        await this.queue.add("sendMail-Job", createUser);
    }
}