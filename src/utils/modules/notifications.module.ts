import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsService } from "../services/notifications.service";
import { NotificationsEntity } from "../sharedEntities/notification.entity";

@Module({
    imports:[TypeOrmModule.forFeature([NotificationsEntity])],
    providers:[NotificationsService],
    exports:[NotificationsService]
})

export class NotificationModule{}