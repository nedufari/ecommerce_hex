import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Role, Status } from 'src/Enums/user-dto/shared-dto/user.enums';

const idType = Number;

export class Admin {
  @ApiProperty({ type: idType })
  id: number;

  @ApiProperty({ type: String, example: 'admin.john@nedu.com' })
  @IsEmail()
  @IsString()
  @Expose()
  email: string;

  @ApiProperty({ type: String, example: 'nedu' })
  @IsString()
  firstname: string;

  @ApiProperty({ type: String, example: 'abigail' })
  @IsString()
  lastname: string;

  @ApiProperty({ type: String})
  @IsString()
  proifilePics: string;

  @ApiProperty({ })
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({type:String, example:'+2349032504705'})
  phoneNumber:string

  @ApiProperty({ enum: Role })
  role?: Role;

  @ApiProperty({ enum: Status })
  status?: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ type: Boolean })
  isVerified: boolean;

  @ApiProperty({ type: String })
  resetPasswordOtp: string;

  @ApiProperty({ type: Date })
  resetPasswordOtpExpirationTime: Date;
}
