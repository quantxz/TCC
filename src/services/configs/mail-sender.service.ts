import { Injectable } from "@nestjs/common";
import { env } from "process";
const nodeMailer = require("nodemailer")


@Injectable()
export class MailSender extends nodeMailer {
    private readonly transporter: typeof nodeMailer;
    constructor() {
        super()
        this.transporter = nodeMailer.createTransport({
            host: "mail.openjavascript.info",
            port: "465",
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
    }

    public async SendEmail(providerEmail: string, clientEmail: string, ) {
        await this.transporter.sendMail({
            from: "OpenJavascript <email@gmail.com>",
            to: "canalsemfoco223@gmail.com",
            subject: "test",
            html: "html"
        })
    }

}