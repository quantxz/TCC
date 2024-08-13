import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { emailBodyRender } from "src/jobs/mail/body/html-body";

@Injectable()
export class mailerManualService {

    constructor(private mailService: MailerService) { }

    async sendMail(to: string, newUserName: string): Promise<void> { 
        await this.mailService.sendMail({
            to,
            from: `codesavvy.suporte@proton.me`,
            subject: "A equipe da CodeSavvy te da boas vindas",
            html: emailBodyRender(newUserName) 
        })
    }
}