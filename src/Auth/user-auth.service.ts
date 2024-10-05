import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/user';
import { UserRepository } from 'src/user/infrastructure/persitence/user.repository';
import { UserService } from 'src/user/user.service';
import { NotificationsService } from 'src/utils/services/notifications.service';
import {
  ResponseService,
  StandardResponse,
} from 'src/utils/services/response.service';
import { SignupDto } from './dto/signup.dto';
import { GeneatorService } from 'src/utils/services/generator.service';
import { MailService } from 'src/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/utils/sharedEntities/otp.entity';
import { LessThan, Repository } from 'typeorm';
;
import { UserRelationalRepository } from 'src/user/infrastructure/persitence/relational/repository/user.repository';
import { UserMapper } from 'src/user/infrastructure/persitence/relational/mapper/user.mapper';
import { VerifyOtp } from './dto/verifyOtp.dto';
import { ResendExpiredOtp } from './dto/resendExpiredOtp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetOtp } from './dto/passwordresetOtp.dto';
import { Role, Status } from 'src/Enums/user-enum/user.enums';

@Injectable()
export class UserAuthService {
  constructor(
    private responseService: ResponseService,
    private notificationService: NotificationsService,
    private userService: UserService,
    private userRepository: UserRepository,
    private generatorService: GeneatorService,
    private mailService: MailService,
    @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
  ) {}

  // profile / me
  async Profile(user:User): Promise<StandardResponse<User>> {
    try {
      
      return this.responseService.success('user profile fetched successfully', {
        ...user,
      });
    } catch (error) {
      return this.responseService.internalServerError(
        'Error fetching User Profile',
        error.message,
      );
    }
  }

  // sign up
  async singUp(dto: SignupDto): Promise<StandardResponse<User>> {
    try {
      const { email, firstname, lastname, phoneNumber, password } = dto;
      const isEmail = await this.userService.findByEmail(email);
      if (isEmail)
        return this.responseService.badRequest('email already exists');

      const hashpassword = await this.generatorService.hashpassword(password);

      const user = await this.userRepository.create({
        email,
        firstname,
        lastname,
        phoneNumber,
        password: hashpassword,
        id: 0,
        proifilePics: '',
        status: Status.INACTIVE,
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: undefined,
        deletedAt: undefined,
        isVerified: false,
        resetPasswordOtp: '',
        resetPasswordOtpExpirationTime: undefined,
        totalRevenue: 0,
      });

      //create and save otp
      const otpCode = await this.generatorService.generateEmailToken();
      let now = new Date();

      const twominutelater = new Date(now.getTime() + 120000);

      await this.otpRepository.save(
        this.otpRepository.create({
          otp: otpCode,
          created_at: new Date(),
          email: email,
          role: Role.USER,
          expiration_time: twominutelater,
        }),
      );
      //send email
      await this.mailService.VerifyOtpMail(email, otpCode, firstname);

      //save notification
      await this.notificationService.create({
        message: `Welcome ${firstname}, your account has been created successfully.`,
        subject: 'Account Creation',
        account: (await user).id, //saves when the user is created
      });

      return this.responseService.success(
        'user registered successfully,please check email provided for the otpCode',
        user,
      );
    } catch (error) {
      return this.responseService.internalServerError(
        'Error occured during Signup',
        error.message,
      );
    }
  }

  // verify otp
  async verifyOtp(dto: VerifyOtp): Promise<StandardResponse<User>> {
    try {
      const isOtp = await this.otpRepository.findOne({
        where: { otp: dto.otp },
      });
      if (!isOtp) return this.responseService.notFound('otp not not found');

      if (isOtp.expiration_time <= new Date())
        return this.responseService.badRequest('otp is expired');

      const user = await this.userService.findByEmail(isOtp.email);
      if (!user)
        return this.responseService.notFound(
          'user associated to otp not found',
        );

      //update the user model
      user.isVerified = true;
      (user.status = Status.ACTIVE), (user.updatedAt = new Date());

      await this.userRepository.update(user.id, user);

      await this.mailService.WelcomeMail(user.email,user.firstname)

      //save notification
      await this.notificationService.create({
        message: `Hello ${user.firstname}, your account has been verified successfully.`,
        subject: 'Email Verification',
        account: user.id,
      });

      return this.responseService.success('email verified successfully', user);
    } catch (error) {
      return this.responseService.internalServerError(
        'Error verifying email',
        error.message,
      );
    }
  }

  //resend expired otp
  async resendOtp(dto: ResendExpiredOtp): Promise<StandardResponse<boolean>> {
    try {
      const findexpiredotp = await this.otpRepository.findOne({
        where: { email: dto.email },
      });
      if (!findexpiredotp)
        return this.responseService.notFound(
          'no otp found for user with email',
        );

      const now = new Date();
      if (now < findexpiredotp.expiration_time)
        return this.responseService.badRequest(' current otp not expired yet');

      const user = await this.userService.findByEmail(dto.email);
      if (!user)
        return this.responseService.notFound(
          'no user is associated with this otp',
        );

      //generate and update otp
      const otpCode = await this.generatorService.generateEmailToken();

      const twominutelater = new Date(now.getTime() + 120000);

      await this.otpRepository.update(findexpiredotp.id, {
        otp: otpCode,
        verified: false,
        expiration_time: twominutelater,
      });

      // Send new OTP via email
      await this.mailService.VerifyOtpMail(dto.email, otpCode, user.firstname);

      await this.notificationService.create({
        message: `Hi ${user.firstname}, otp resent after two minutes.`,
        subject: 'OTP resent After two Minutes',
        account: user.id,
      });

      return this.responseService.success('otp resent successfully',true);
    } catch (error) {
      return this.responseService.internalServerError(
        'Error resending otp',
        error.message,
      );
    }
  }

  // send reset password otp
  async SendResetPasswordOtp(
    dto: RequestPasswordResetOtp,
  ): Promise<StandardResponse<boolean>> {
    try {
      const user = await this.userService.findByEmail(dto.email);
      if (!user)
        return this.responseService.notFound('this email is not found');

      //generate and update otp
      const resetOtp = await this.generatorService.generateEmailToken();

      // Send resetOTP via email
      await this.mailService.ForgotPasswordMail(dto.email, resetOtp, user.firstname);

      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 1);
      user.resetPasswordOtp = resetOtp;
      user.resetPasswordOtpExpirationTime = expirationTime;
      await this.userRepository.update(user.id, user);

      await this.notificationService.create({
        message: `Hi ${user.firstname}, password reset otp sent.`,
        subject: 'Password Reset otp sent',
        account: user.id,
      });

      return this.responseService.success(
        'Password reset token sent successfully',true
      );
    } catch (error) {
      return this.responseService.internalServerError(
        'Error sending Password ',
        error.message,
      );
    }
  }

  //verify password reset otp
  async verifyResetPasswordOtp(
    dto: VerifyOtp,
  ): Promise<StandardResponse<boolean>> {
    try {
      const findresetOtp = await this.userService.findByPasswordResetOtp(
        dto.otp,
      );
      if (!findresetOtp)
        return this.responseService.notFound('reset password otp not a match');

      if (findresetOtp.resetPasswordOtpExpirationTime <= new Date())
        return this.responseService.badRequest('reset password otp expired');

      await this.notificationService.create({
        message: `Hi ${findresetOtp.firstname}, password reset otp verified.`,
        subject: 'Password Reset otp verified',
        account: findresetOtp.id,
      });

      return this.responseService.success(
        'password reset otp verified successfully',true
      );
    } catch (error) {
      return this.responseService.internalServerError(
        'Error verifying reset password otp',
        error.message,
      );
    }
  }

  //reset password
  async resetPassword(
    dto: ResetPasswordDto,
  ): Promise<StandardResponse<boolean>> {
    try {
      const user = await this.userService.findByEmail(dto.email);
      if (!user)
        return this.responseService.badRequest(
          'email not associated with any user',
        );

      if (!user.isVerified)
        return this.responseService.badRequest('user is not verified yet');
      //hash new password
      const hashpassword = await this.generatorService.hashpassword(
        dto.password,
      );

      user.password = hashpassword;
      user.resetPasswordOtp=null,
      user.resetPasswordOtpExpirationTime=null

      await this.userRepository.update(user.id, user);

      await this.notificationService.create({
        message: `Hi ${user.firstname}, password reset sucessful.`,
        subject: 'Password Reset',
        account: user.id,
      });

      return this.responseService.success('password reset successful',true);
    } catch (error) {
      return this.responseService.internalServerError(
        'Error reseting password',
        error.message,
      );
    }
  }

  // login
  async Login(dto: LoginDto): Promise<StandardResponse<any>> {
    try {
      const user = await this.userService.findByEmail(dto.email);
      if (!user)
        return this.responseService.notFound('invalid email');

      const comparePassword = await this.generatorService.comaprePassword(
        dto.password,
        user.password,
      );
      if (!comparePassword)
        return this.responseService.notFound('invalid password');

      if (!user.isVerified)
        return this.responseService.badRequest('user is not verified yet');

      await this.notificationService.create({
        message: `Hi ${user.firstname}, logged in successfully.`,
        subject: 'User Login',
        account: user.id,
      });

      // Generate and return JWT token
      const token = await this.generatorService.signToken(
        user.id,
        user.email,
        user.role,
      );

      return this.responseService.success('log in successful', {
        token: token,
        user: user,
      });
    } catch (error) {
      return this.responseService.internalServerError(
        'Error logging in',
        error.message,
      );
    }
  }
}
