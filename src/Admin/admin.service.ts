import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/utils/services/notifications.service';
import {
  ResponseService,
  StandardResponse,
} from 'src/utils/services/response.service';
import { AdminRepository } from './infrastructure/admin-repository';
import { Admin } from './domain/admin';
import { NullableType } from 'src/utils/types/nullable.types';


@Injectable()
export class AdminService {
  constructor(
    private responseService: ResponseService,
    notificationsService: NotificationsService,
    private adminRepository: AdminRepository,
  ) {}

  //update

  // find by id
  async findByID(id: number): Promise<NullableType<Admin>> {
    return await this.adminRepository.findbyID(id);
  }

  //find by email

  async findByEmail(email: string): Promise<NullableType<Admin>> {
    return await this.adminRepository.findbyEmail(email);
  }

  async findByPasswordResetOtp(otp: string): Promise<NullableType<Admin>> {
    return await this.adminRepository.findbyPasswordResetOtp(otp);
  }

  //find many with pagination

  //find the
}
