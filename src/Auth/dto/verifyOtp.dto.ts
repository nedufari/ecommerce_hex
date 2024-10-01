import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsString } from "class-validator";

export class VerifyOtp{
    @ApiProperty({type:String, example:'000000'})
    @IsString()
    @IsNotEmpty()
    otp:string
}