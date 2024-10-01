import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/infrastructure/persitence/relational/entity/user.entity";
import { GeneatorService } from "src/utils/services/generator.service";
import { AdminSeedService } from "./admin-seed.service";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers:[GeneatorService,AdminSeedService],
    exports:[AdminSeedService]

})
export class AdminSeedModule{}