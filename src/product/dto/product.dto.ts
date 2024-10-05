import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { ProductAvailability } from "src/Enums/shared-enums/products.enums";

export class CreateProductDto{
    @ApiProperty({type:String,example:'baby diaper'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({type:Number,example:'$200'})
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty()
    price:number


    @ApiProperty({type:Number, example:'4%'})
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    productTax?:number


    @ApiProperty({type:String,example:'for all baby sizes '})
    @IsString()
    @IsNotEmpty()
    description:string

    @ApiProperty({type:String,example:'red,cyan,white'})
    @IsString()
    @IsOptional()
    availableColors?:string

    @ApiProperty({type:String,example:'small,medium,large'})
    @IsString()
    @IsOptional()
    availableSizes?:string

    @ApiProperty({type:Number,example:'1000'})
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value,10))
    stock:number

    @ApiProperty({type:Number,example:'12'})
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value,10))
    minWholesaleQuantity?:number

    @ApiProperty({type:Number,example:'$100'})
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    @IsOptional()
    wholeSalePrice?:number


    @ApiProperty({enum:ProductAvailability})
    @IsNotEmpty()
    @IsEnum(ProductAvailability)
    availability?:ProductAvailability

    @ApiProperty({type:Number,example:1})
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value,10))
    subCategoryId: number;
}