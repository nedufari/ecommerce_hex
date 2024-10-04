import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from 'src/Admin/infrastructure/admin-repository';
import { AdminEntity } from 'src/Admin/infrastructure/persistence/relational/entity/admin.entity';
import { Role, Status } from 'src/Enums/shared-enums/user.enums';
import { UserEntity } from 'src/user/infrastructure/persitence/relational/entity/user.entity';
import { GeneatorService } from 'src/utils/services/generator.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminSeedService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private generatorService: GeneatorService,
  ) {}

  async run() {
    const countUser = await this.adminRepository.count({
      where: { role:Role.ADMIN },
    });

    if (!countUser) {
      const salt = await this.generatorService.generateUserID;
      const password = await this.generatorService.hashpassword(salt);
      await this.adminRepository.save(
        this.adminRepository.create({
          firstname: 'ned',
          lastname: 'abby',
          email: 'neduabby@example.com',
          password:password,
          role: Role.USER,
          status: Status.ACTIVE,
        }),
      );
    }
  }
}
