import nodeMailer from 'nodemailer';
import handlebars from 'handlebars';
import sgMail from '@sendgrid/mail';
import { htmlToText } from 'html-to-text';
import path from 'path';
import { promises as fs } from 'fs';
import { EMAIL_OPTIONS, IS_PROD, SENDGRID_API_KEY, MAIL_FROM } from './config';

sgMail.setApiKey(SENDGRID_API_KEY);

interface MailArgs {
  to: string;
  url: string;
  name: string;
}

interface MailOptions {
  html: string;
  text: string;
  to: string;
  subject: string;
  from: string;
}

export class Mailer {
  url: string;
  to: string;
  name: string;

  constructor(args: MailArgs) {
    this.url = args.url;
    this.name = args.name;
    this.to = args.to;
  }

  async send(template: string, subject: string) {
    const source = await fs.readFile(
      path.join(__dirname, `/../templates/${template}.hbs`),
      'utf-8'
    );
    const temp = handlebars.compile(source)({ name: this.name, url: this.url });

    const mailOptions = {
      from: `Fullstack boilerplate <${MAIL_FROM}>`,
      to: this.to,
      subject,
      html: temp,
      text: htmlToText(temp),
    };

    if (IS_PROD) {
      await sgMail.send(mailOptions);
    } else {
      await sendDev(mailOptions);
    }
  }

  async sendResetPassword() {
    await this.send('reset_password', 'Reset your password');
  }
}

const sendDev = async (mailOptions: MailOptions) => {
  const transport = nodeMailer.createTransport(EMAIL_OPTIONS);

  await transport.sendMail(mailOptions);
};
