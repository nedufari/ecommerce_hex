import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class updateUserDto{

    @ApiPropertyOptional({type:String, example:'ned'})
    @IsString()
    @IsOptional()
    firstname:string

    @ApiPropertyOptional({type:String, example:'abby'})
    @IsString()
    @IsOptional()
    lastname:string

    @ApiPropertyOptional({type:String, example:'ned'})
    @IsString()
    @IsOptional()
    phoneNumber:string

    @ApiPropertyOptional({type:String, example:'ned@example.com'})
    @IsEmail()
    @IsOptional()
    email:string




}