import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, Status } from 'src/Enums/user-enum/user.enums';

import { UserEntity } from 'src/user/infrastructure/persitence/relational/entity/user.entity';
import { GeneatorService } from 'src/utils/services/generator.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private generatorService: GeneatorService,
  ) {}

  async run() {
    const countUser = await this.userRepository.count({
      where: { role:Role.USER },
    });

    if (!countUser) {
      const salt = await this.generatorService.generateUserID;
      const password = await this.generatorService.hashpassword(salt);
      await this.userRepository.save(
        this.userRepository.create({
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
