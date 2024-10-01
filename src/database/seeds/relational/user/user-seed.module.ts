import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/infrastructure/persitence/relational/entity/user.entity";
import { GeneatorService } from "src/utils/services/generator.service";
import { UserSeedService } from "./user-seed.service";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers:[GeneatorService,UserSeedService],
    exports:[UserSeedService]

})
export class UserSeedModule{}