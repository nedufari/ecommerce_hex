import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import appConfig from './config/app.config';
import { AdminModule } from './Admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database/config/database.config';
import authConfig from './Auth/config/auth.config';
import { TypeOrmConfigService } from './database/typeorm/typeorm-config.service';
import { MailModule } from './mailer/mailer.module';
import { NotificationModule } from './utils/modules/notifications.module';
import { AuthModule } from './Auth/auth.module';
import { CloudinaryService } from './utils/services/claudinary.service';
import { CloudinaryConfig } from './utils/claudinary/cloudinary.config';



@Module({
  imports: [
    AdminModule,
    MailModule,
    UserModule,
    NotificationModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmConfigService
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig,databaseConfig,authConfig] }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService,CloudinaryService,CloudinaryConfig],
  exports:[CloudinaryService,CloudinaryConfig]
})
export class AppModule {}
