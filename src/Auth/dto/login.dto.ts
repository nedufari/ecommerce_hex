import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto{
    @ApiProperty({type:String, example:'ned@example.com'})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({type:String, example:'Abc#12'})
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({minLength:6,minLowercase:1,minNumbers:1,minSymbols:1,minUppercase:1})
    password:string

}