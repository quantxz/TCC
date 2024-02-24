import nodemailer from "nodemailer";
import dotenv  from "dotenv";
dotenv.config();  

export class MailSender {
    private readonly email;

    constructor() {
        this.email = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,  
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
    }

    //arumar a tipagem do retorno
    public async sendMail(userEmail: string): Promise<Exclude<any, unknown & void & null & undefined>> {
        try {
            await this.email.sendMail({
                //de
                from: `Anderson Silva <${process.env.USER}>`,
                //para
                to: userEmail,
                //assunto do email
                subject: "Bem vinda, estamos muito gratos por participar da versão beta de nosso aplicativo",
                //texo do email (tambem da pra mandar um html no email, pique um readme.md, usando no lugar de text um html)
                html: "htmlBody"
            });

        } catch(error) {
            console.debug(error)
        }
    }
}
