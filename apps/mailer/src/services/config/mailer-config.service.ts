import { MailerOptions, MailerOptionsFactory } from '@nest-modules/mailer';

export class MailerConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: process.env.MAILER_HOST,
        secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
      defaults: {
        from: process.env.MAILER_FROM,
      },
    };
  }
}
