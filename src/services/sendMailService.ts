import fs from 'fs';
import handleBars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then((account => {
            this.client = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
        }))
    }

    async execute(to: string, subject: string, variables: object, path: string) {
        const template = await fs.readFileSync(path).toString("utf-8")

        const mailTemplateParse = handleBars.compile(template)

        const html = mailTemplateParse(variables)

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: 'NPS <noreplay@nps.com>'
        })

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService()