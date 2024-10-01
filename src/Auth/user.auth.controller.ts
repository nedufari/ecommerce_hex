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

@ApiTags('User Auth')
@Controller({
  path: 'user-auth',
  version: '1',
})
@ApiExtraModels(StandardResponse, User)
export class UserAuthController {
  constructor(private readonly userauthService: UserAuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('profile')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<User>) },
        {
          properties: {
            payload: {
              $ref: getSchemaPath(User),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'fetch logged in user profile (guarded)' })
  @HttpCode(HttpStatus.OK)
  async profile(@Req() req): Promise<StandardResponse<User>> {
    return await this.userauthService.Profile(req.user);
  }

  @Post('signup')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<User>) },
        {
          properties: {
            payload: {
              $ref: getSchemaPath(User),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'User signup' })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body()dto: SignupDto): Promise<StandardResponse<User>> {
    return await this.userauthService.singUp(dto);
  }

  @Post('verify-otp')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<User>) },
        {
          properties: {
            payload: {
              $ref: getSchemaPath(User),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'verification of the otp sent after user successfully registers' })
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body()dto: VerifyOtp): Promise<StandardResponse<User>> {
    return await this.userauthService.verifyOtp(dto);
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
    return await this.userauthService.resendOtp(dto);
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
    return await this.userauthService.SendResetPasswordOtp(dto);
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
    return await this.userauthService.verifyResetPasswordOtp(dto);
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
    return await this.userauthService.resetPassword(dto);
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
  @ApiOperation({ summary: 'Login user' })
  @HttpCode(HttpStatus.OK)
  async login(@Body()dto: LoginDto): Promise<StandardResponse<any>> {
    return await this.userauthService.Login(dto)
  }
}
