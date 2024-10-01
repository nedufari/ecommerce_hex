import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service:configService.get('SERVICE'),
          host: configService.get('HOST'),
          port: configService.get('PORT'),
          secure: false, // true for 465, false for other ports
          auth: {
            user: configService.get('AUTH_EMAIL'),
            pass: configService.get('AUTH_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <' + configService.get('AUTH_EMAIL') + '>',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}