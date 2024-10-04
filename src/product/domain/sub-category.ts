import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";
import { ProductEntity } from "../infrastructure/persistence/relational/entity/product.entity";
import { CategoryEntity } from "../infrastructure/persistence/relational/entity/category.entity";

export class SubCategory{
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

    @ApiProperty({type:()=>ProductEntity})
    products?:ProductEntity[]

    @ApiProperty({type:()=>CategoryEntity})
    category:CategoryEntity[]


    



}