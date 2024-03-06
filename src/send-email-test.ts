import { MailerService } from '@nestjs-modules/mailer';
import { emailBodyRender } from './jobs/mail/body/html-body';

async function sendTestEmail() {
    const mailerOptions = {
        transport: {
            host: process.env.MAIL_HOST, // Replace with your SMTP host
            port: 465, // Replace with your SMTP port
            secure: false, // Set to true if your SMTP server requires a secure connection
            auth: {
                user: process.env.USER, // Replace with your SMTP username
                pass: process.env.PASS, // Replace with your SMTP password
            },
        },
    };

    const mailService = new MailerService(mailerOptions, null); // Pass a null transportFactory for simplicity

    await mailService.sendMail({
        to: 'canalsemfoco223@gmail.com',
        from: `CodeSavvy <${process.env.USER}>`,
        subject: 'Test Email',
        html: emailBodyRender('YourName'),
    });
}

sendTestEmail();
