import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminRepository } from "../../admin-repository";
import { AdminRelationalRepository } from "./repository/admin.repository";
import { Admin } from "typeorm";
import { AdminEntity } from "./entity/admin.entity";

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity])],
    providers:[{provide:AdminRepository, useClass :AdminRelationalRepository}],
    exports:[AdminRepository],
})
export class RelationalAdminPersistenceModule{}