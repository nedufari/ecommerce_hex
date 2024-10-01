import { Module } from '@nestjs/common';
import { UserSeedModule } from './user/user-seed.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/database/config/database.config';
import appConfig from 'src/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm/typeorm-config.service';
import { AdminSeedModule } from './admin/admin-seed.module';

@Module({
  imports: [
    AdminSeedModule,
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class SeedModule {}
