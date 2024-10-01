import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNotificationsDto } from "../dto/notification.dto";
import { NotificationsEntity } from "../sharedEntities/notification.entity";

@Injectable()
export class NotificationsService{
    constructor(@InjectRepository(NotificationsEntity) private readonly notificationsRepository: Repository<NotificationsEntity>){}

    async create(dto:CreateNotificationsDto):Promise<NotificationsEntity>{
        return await this.notificationsRepository.create({
            message:dto.message,
            subject:dto.message,
            account:dto.account,
            isRead:false,
        })
    }
}