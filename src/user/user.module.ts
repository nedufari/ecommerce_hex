import { Module } from '@nestjs/common';
import { RelationalUserPersistenceModule } from './infrastructure/persitence/relational/relational-persistence.module';
import { UserService } from './user.service';
import { CloudinaryService } from 'src/utils/services/claudinary.service';
import { NotificationsService } from 'src/utils/services/notifications.service';
import { ResponseService } from 'src/utils/services/response.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsEntity } from 'src/utils/sharedEntities/notification.entity';

@Module({
  imports: [
    RelationalUserPersistenceModule,
    TypeOrmModule.forFeature([NotificationsEntity]),
  ],
  providers: [
    UserService,
    CloudinaryService,
    NotificationsService,
    ResponseService,
  ],
  controllers: [UserController],

  exports: [RelationalUserPersistenceModule],
})
export class UserModule {}
