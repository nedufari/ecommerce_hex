import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/Admin/infrastructure/persistence/relational/entity/admin.entity';
import { UserEntity } from 'src/user/infrastructure/persitence/relational/entity/user.entity';
import { NotificationsService } from 'src/utils/services/notifications.service';
import { ResponseService } from 'src/utils/services/response.service';
import { NotificationsEntity } from 'src/utils/sharedEntities/notification.entity';
import { JwtGuard } from './Guard/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminAuthService } from './admin-auth.service';
import { UserAuthService } from './user-auth.service';
import { AdminAuthController } from './admin.auth.controller';
import { UserAuthController } from './user.auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { GeneatorService } from 'src/utils/services/generator.service';
import { MailService } from 'src/mailer/mailer.service';
import { RelationalUserPersistenceModule } from 'src/user/infrastructure/persitence/relational/relational-persistence.module';
import { OtpEntity } from 'src/utils/sharedEntities/otp.entity';
import { AdminService } from 'src/Admin/admin.service';
import { RelationalAdminPersistenceModule } from 'src/Admin/infrastructure/persistence/relational/admin-relational-persistence.module';
import { CloudinaryService } from 'src/utils/services/claudinary.service';

@Module({
  imports: [
    RelationalUserPersistenceModule,
    RelationalAdminPersistenceModule,
    TypeOrmModule.forFeature([
      NotificationsEntity,
      AdminEntity,
      UserEntity,
      OtpEntity,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_JWT_SECRET,
        signOptions: { expiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN },
      }),
    }),
  ],
  providers: [
    NotificationsService,
    ResponseService,
    JwtGuard,
    JwtStrategy,
    AdminAuthService,
    UserAuthService,
    AuthService,
    UserService,
    AdminService,
    GeneatorService,
    MailService,
    CloudinaryService
  ],
  controllers: [AdminAuthController, UserAuthController],
  
})
export class AuthModule {}
