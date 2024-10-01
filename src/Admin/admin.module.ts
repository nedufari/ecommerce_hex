import { Module } from "@nestjs/common";
import { RelationalAdminPersistenceModule } from "./infrastructure/persistence/relational/admin-relational-persistence.module";
import { AdminService } from "./admin.service";
import { ResponseService } from "src/utils/services/response.service";
import { NotificationsService } from "src/utils/services/notifications.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsEntity } from "src/utils/sharedEntities/notification.entity";

@Module({
    imports:[RelationalAdminPersistenceModule,TypeOrmModule.forFeature([NotificationsEntity,])],
    providers:[
        AdminService,
        ResponseService,
        NotificationsService
    ],
    controllers:[],
})

export class AdminModule{}