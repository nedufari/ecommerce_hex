import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, UserRepository } from '../../user.repository';
import { UserEntity } from '../entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/domain/user';
import { UserMapper } from '../mapper/user.mapper';
import { FilterUserDto, SortUserDto } from 'src/user/dto/query-user.dto';

export class UserRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const persistenceUser = UserMapper.toPersistence(user);
    const savedUser = await this.userEntityRepository.save(persistenceUser);
    return UserMapper.toDomain(savedUser);
  }

  
  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto;
    sortOptions?: SortUserDto[];
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FindOptionsWhere<UserEntity> = {};
    if (filterOptions?.status?.length) {
      where.status = filterOptions.status;
    }

    const entities = await this.userEntityRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
    return entities.map((user) => UserMapper.toDomain(user));
  }



  async findbyID(id: number): Promise<User | null> {
    const user = await this.userEntityRepository.findOne({ where: { id: id } });
    return user ? UserMapper.toDomain(user) : null;
  }



  async findbyEmail(email: string): Promise<User | null> {
    const user = await this.userEntityRepository.findOne({
      where: { email: email },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findbyPasswordResetOtp(otp: string): Promise<User | null> {
    const user = await this.userEntityRepository.findOne({
      where: { resetPasswordOtp: otp },
    });
    return user ? UserMapper.toDomain(user) : null;
  }


  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userEntityRepository.update(
      id,
      UserMapper.toPersistence(user as User),
    );
    const updatedUser = await this.userEntityRepository.findOne({
      where: { id: id },
    });
    return UserMapper.toDomain(updatedUser);
  }



  async remove(id: number): Promise<void> {
    await this.userEntityRepository.delete(id);
  }
}
