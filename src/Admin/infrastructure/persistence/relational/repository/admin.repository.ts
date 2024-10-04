import { InjectRepository } from "@nestjs/typeorm";
import { AdminRepository } from "../../../admin-repository";
import { AdminEntity } from "../entity/admin.entity";
import {  FindOptionsWhere, Repository } from "typeorm";
import { AdminMapper } from "../mapper/admin.mapper";
import { Admin } from "src/Admin/domain/admin";
import { FilterUserDto, SortUserDto } from "src/user/dto/query-user.dto";
import { IPaginationOptions } from "src/user/infrastructure/persitence/user.repository";

export class AdminRelationalRepository implements AdminRepository{
    constructor(@InjectRepository(AdminEntity) private adminEntityRepository:Repository<AdminEntity>){}
    
    async create(admin: Admin): Promise<Admin> {
        const persistenceAdmin = AdminMapper.toPersistence(admin)
        const savedAdmin = await this.adminEntityRepository.save(persistenceAdmin)
        return AdminMapper.toDomain(savedAdmin)
        
    }async findManyWithPagination({ filterOptions, sortOptions, paginationOptions }: { filterOptions?: FilterUserDto; sortOptions?: SortUserDto[]; paginationOptions: IPaginationOptions; }): Promise<Admin[]> {
        const where: FindOptionsWhere<AdminEntity> = {};
        if (filterOptions?.status?.length) {
          where.status = filterOptions.status;
        }
    
        const entities = await this.adminEntityRepository.find({
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
        return entities.map((user) => AdminMapper.toDomain(user));
    }

    async findbyID(id: number): Promise<Admin | null> {
        const admin = await this.adminEntityRepository.findOne({where:{id:id}})
        return admin ? AdminMapper.toDomain(admin):null
    }

    async findbyEmail(email:string): Promise<Admin | null> {
        const admin = await this.adminEntityRepository.findOne({where:{email:email}})
        return admin ? AdminMapper.toDomain(admin):null
    }

    async findbyPasswordResetOtp(otp: string): Promise<Admin | null> {
      const admin = await this.adminEntityRepository.findOne({
        where: { resetPasswordOtp: otp },
      });
      return admin ? AdminMapper.toDomain(admin) : null;
    }

     async update(id: number, admin: Partial<Admin>): Promise<Admin> {
        await this.adminEntityRepository.update(id,AdminMapper.toPersistence(admin as Admin))
        const updateAdmin = await this.adminEntityRepository.findOne({where:{id:id}})
        return AdminMapper.toDomain(updateAdmin)
    }

    async remove(id: number): Promise<void> {
         await this.adminEntityRepository.delete(id)
        
    }
    
}