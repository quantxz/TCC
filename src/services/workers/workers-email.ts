const { MailSender } = require("../configs/mail.service.ts" || "../configs/mail.service.js");
const { parentPort } = require("worker_threads");

const emailService = new MailSender(); 
parentPort.on('message', async (userEmail) => {
    const emailSent = await emailService.sendMail(userEmail)
    
    if(emailSent) {
        parentPort.postMessage({
            status: 'done',
            hour: new Date().toISOString()
        });
    } else {
        parentPort.postMessage({
            status: 'error',
            date: {
                hour: new Date().getHours(),
                minute: new Date().getMinutes()
            }
        });
    }

});