import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { isValidationOptions, useContainer } from 'class-validator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AllConfigType } from './config/config.type';
import { SignupDto } from './Auth/dto/signup.dto';
import { LoginDto } from './Auth/dto/login.dto';
import { UserEntity } from './user/infrastructure/persitence/relational/entity/user.entity';
import { AdminEntity } from './Admin/infrastructure/persistence/relational/entity/admin.entity';
import { OtpEntity } from './utils/sharedEntities/otp.entity';
import { NotificationsEntity } from './utils/sharedEntities/notification.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService<AllConfigType>);
  app.enableShutdownHooks();

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('official API DOCS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    extraModels: [UserEntity,AdminEntity,OtpEntity,NotificationsEntity],
  };

  const document = SwaggerModule.createDocument(app, config,options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
