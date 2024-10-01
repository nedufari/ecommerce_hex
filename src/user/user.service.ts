import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/utils/services/notifications.service';
import {
  ResponseService,
  StandardResponse,
} from 'src/utils/services/response.service';
import { UserRepository } from './infrastructure/persitence/user.repository';
import { NullableType } from 'src/utils/types/nullable.types';
import { User } from './domain/user';
import { updateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/utils/services/claudinary.service';

@Injectable()
export class UserService {
  constructor(
    private responseService: ResponseService,
    private notificationsService: NotificationsService,
    private userRepository: UserRepository,
    private claudinaryService: CloudinaryService,
  ) {}

  //update

  // find by id
  async findByID(id: number): Promise<NullableType<User>> {
    return await this.userRepository.findbyID(id);
  }

  //find by email

  async findByEmail(email: string): Promise<NullableType<User>> {
    return await this.userRepository.findbyEmail(email);
  }

  async findByPasswordResetOtp(otp: string): Promise<NullableType<User>> {
    return await this.userRepository.findbyPasswordResetOtp(otp);
  }

  //find many with pagination

  //update user
  async UpdateUser(
    user: User,
    dto: updateUserDto,
  ): Promise<StandardResponse<User>> {
    try {
      const updatedUser = {
        ...user,
        ...dto,
      };

      if (dto.email){
        const checkemail = await this.findByEmail(dto.email)
        if (checkemail) return this.responseService.badRequest('email already exists')
      }

      await this.userRepository.update(user.id, updatedUser);

      //save notification
      await this.notificationsService.create({
        message: ` ${updatedUser.firstname},  has updated a record.`,
        subject: 'Account Updated',
        account: updatedUser.id, //saves when the user is created
      });
      return this.responseService.success(
        'user record updated successfully ',
        updatedUser,
      );
    } catch (error) {
      return this.responseService.internalServerError(
        'Error updating user record',
        error.message,
      );
    }
  }

  async uploadUserProfilePics(
    user: User,
    mediafile: Express.Multer.File,
  ): Promise<StandardResponse<User>> {
    try {
      const display_pics = await this.claudinaryService.uploadFile(mediafile);
      const mediaurl = display_pics.secure_url;

      user.proifilePics = mediaurl;

      await this.userRepository.update(user.id, user);

      await this.notificationsService.create({
        message: ` ${user.firstname},  has uploaded profile pics .`,
        subject: 'Account Updated',
        account: user.id, //saves when the user is created
      });

      return this.responseService.success('profile pics updated', user);
    } catch (error) {
      return this.responseService.internalServerError(
        'Error uploading profile pics',
        error.message,
      );
    }
  }
}
