import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Role, Status } from 'src/Enums/shared-enums/user.enums';

const idType = Number;

export class User {
  @ApiProperty({ type: idType })
  id: number;

  @ApiProperty({ type: String, example: 'john@nedu.com' })
  @IsEmail()
  @IsString()
  @Expose()
  email: string;

  @ApiProperty({ type: String, example: 'ned' })
  @IsString()
  firstname: string;

  @ApiProperty({ type: String, example: 'abby' })
  @IsString()
  lastname: string;

  @ApiProperty({ type: String, example: 'abby' })
  @IsString()
  proifilePics: string;

  @ApiProperty({type:String, example:'+2349032504705'})
  phoneNumber:string

  @ApiProperty({})
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

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

  @ApiProperty({ type: Number })
  totalRevenue: number;
}
