import {
    Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { StandardResponse } from 'src/utils/services/response.service';
import { User } from 'src/user/domain/user';
import { UserAuthService } from './user-auth.service';
import { JwtGuard } from './Guard/jwt.guard';
import { SignupDto } from './dto/signup.dto';
import { VerifyOtp } from './dto/verifyOtp.dto';
import { ResendExpiredOtp } from './dto/resendExpiredOtp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { RequestPasswordResetOtp } from './dto/passwordresetOtp.dto';
import { LoginDto } from './dto/login.dto';
import { AdminAuthService } from './admin-auth.service';
import { Admin } from 'src/Admin/domain/admin';

@ApiTags('Admin Auth')
@Controller({
  path: 'admin-auth',
  version: '1',
})
@ApiExtraModels(StandardResponse, Admin)
export class AdminAuthController {
  constructor(private readonly adminauthService: AdminAuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('profile')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<Admin>) },
        {
          properties: {
            payload: {
              $ref: getSchemaPath(Admin),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'fetch logged in admin profile (guarded)' })
  @HttpCode(HttpStatus.OK)
  async profile(@Req() req): Promise<StandardResponse<Admin>> {
    return await this.adminauthService.Profile(req.user);
  }

  @Post('signup')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<Admin>) },
        {
          properties: {
            payload: {
              $ref: getSchemaPath(Admin),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Admin signup' })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body()dto: SignupDto): Promise<StandardResponse<Admin>> {
    return await this.adminauthService.singUp(dto);
  }

  @Post('verify-otp')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<Admin>) },
        {
          properties: {
            payload: {
              $ref: getSchemaPath(Admin),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'verification of the otp sent after user successfully registers' })
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body()dto: VerifyOtp): Promise<StandardResponse<Admin>> {
    return await this.adminauthService.verifyOtp(dto);
  }

  @Post('resend-otp')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<boolean>) },
        {
          properties: {
            payload: {},
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'otp resent after initial one sent had expired' })
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body()dto: ResendExpiredOtp): Promise<StandardResponse<boolean>> {
    return await this.adminauthService.resendOtp(dto);
  }

  @Post('forgot-password')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<boolean>) },
        {
          properties: {
            payload: {},
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'request for reset password otp' })
  @HttpCode(HttpStatus.OK)
  async SendResetPasswordOtp(
    @Body()dto: RequestPasswordResetOtp,
  ): Promise<StandardResponse<boolean>> {
    return await this.adminauthService.SendResetPasswordOtp(dto);
  }

  @Post('verify-reset-password-otp')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<boolean>) },
        {
          properties: {
            payload: {},
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'verify reset password otp sent' })
  @HttpCode(HttpStatus.OK)
  async verifyResetPasswordOtp(
    @Body()dto: VerifyOtp,
  ): Promise<StandardResponse<boolean>> {
    return await this.adminauthService.verifyResetPasswordOtp(dto);
  }

  @Patch('reset-password')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<boolean>) },
        {
          properties: {
            payload: {},
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'finally reset password' })
  @HttpCode(HttpStatus.OK)
  async resetPassword(
   @Body() dto: ResetPasswordDto,
  ): Promise<StandardResponse<boolean>> {
    return await this.adminauthService.resetPassword(dto);
  }

  @Post('login')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<any>) },
        {
          properties: {
            payload: {},
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Login admin' })
  @HttpCode(HttpStatus.OK)
  async login(@Body()dto: LoginDto): Promise<StandardResponse<any>> {
    return await this.adminauthService.Login(dto)
  }
}
