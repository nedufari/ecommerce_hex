import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/infrastructure/persistence/relational/entity/admin.entity";
import { AllConfigType } from "src/config/config.type";
import { UserEntity } from "src/user/infrastructure/persitence/relational/entity/user.entity";
import { NotificationsEntity } from "src/utils/sharedEntities/notification.entity";
import { OtpEntity } from "src/utils/sharedEntities/otp.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor ( private configService:ConfigService){}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
          type: this.configService.get('DATABASE_TYPE', { infer: true }),
          host: this.configService.get('dDATABASE_HOST', { infer: true }),
          port: this.configService.get('DATABASE_PORT', { infer: true }),
          username: this.configService.get('DATABASE_USERNAME', { infer: true }),
          password: this.configService.get('DATABASE_PASSWORD', { infer: true }),
          database: this.configService.get('DATABASE_NAME', { infer: true }),
          synchronize: this.configService.get('DATABASE_SYNCHRONIZE', {
            infer: true,
          }),
          dropSchema: false,
          keepConnectionAlive: true,
          logging:
            this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
          entities: [UserEntity,AdminEntity,NotificationsEntity,OtpEntity],
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          cli: {
            entitiesDir: 'src',
    
            subscribersDir: 'subscriber',
          },
          extra: {
            // based on https://node-postgres.com/apis/pool
            // max connection pool size
            max: this.configService.get('DATABASE_MAX_CONNECTIONS', { infer: true }),
            ssl: this.configService.get('DATABASE_SSL_ENABLE', { infer: true })
              ? {
                  rejectUnauthorized: this.configService.get(
                    'DATABASE_REJECT_UNAUTHORIZED',
                    { infer: true },
                  ),
                  ca:
                    this.configService.get('database.ca', { infer: true }) ??
                    undefined,
                  key:
                    this.configService.get('database.key', { infer: true }) ??
                    undefined,
                  cert:
                    this.configService.get('database.cert', { infer: true }) ??
                    undefined,
                }
              : undefined,
          },
        } as TypeOrmModuleOptions;
      }
        
}