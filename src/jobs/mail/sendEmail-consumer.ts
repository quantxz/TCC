import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { emailBodyRender } from "./body/html-body";

//injeta este codigo no sendEmail           service
@Processor('mail-Queue')
export class sendMailConsumer {
    constructor(private mailService: MailerService) { }


    @Process('sendMail-Job')
    async sendMailJob(job: Job<CreateUserDto>) {
        await this.mailService.sendMail({
            to: job.data.email,
            from: `Project Name <${process.env.USER}>`,
            subject: "hello",
            html: emailBodyRender(job.data.name)
        })
    }
}