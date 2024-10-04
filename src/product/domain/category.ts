import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";
import { SubcategoryEntity } from "../infrastructure/persistence/relational/entity/sub-category.entity";

export class Category{
    @ApiProperty({type:Number})
    @IsNumber()
    id:number

    @ApiProperty({type:String})
    @IsString()
    name:string

    @ApiProperty({type:String})
    @IsString()
    description:string

    @ApiProperty({type:String})
    @IsString()
    banner:string

    @ApiProperty()
    @IsDate()
    createdAT:Date

    @ApiProperty()
    @IsDate()
    updatedAT:Date

    @ApiProperty({type:()=>SubcategoryEntity})
    subcategories?:SubcategoryEntity[]


    



}