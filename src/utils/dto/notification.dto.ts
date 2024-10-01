import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateNotificationsDto {
 
  @ApiProperty({ type:String,example: 'UserSignUp!' })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  subject: string;

  @ApiProperty({ type:String, example: 'user have signed up successfully' })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  message: string;


  @ApiProperty({type:Number})
  @IsNotEmpty()
  account: number;

}
  