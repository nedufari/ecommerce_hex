import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AdminEntity } from "src/Admin/infrastructure/persistence/relational/entity/admin.entity"
import { UserEntity } from "src/user/infrastructure/persitence/relational/entity/user.entity"
import { Admin, Repository } from "typeorm"

@Injectable()
export class AuthService{
    constructor(@InjectRepository(AdminEntity)private readonly adminRepo:Repository<AdminEntity>,
    @InjectRepository(UserEntity)private readonly userRepo:Repository<UserEntity>)
   {}

    //validateuseroradminbyidandrole

    async ValidateUserOrAdminByIdandRole(id:number, role:string){
        switch(role){
            case "admin":
                return await this.adminRepo.findOne({where:{id:id}})
            case "user":
                return await this.userRepo.findOne({where:{id:id}})
           

            default:
                return null
        }
    }

}