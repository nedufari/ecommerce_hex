import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { ProductAvailability } from "src/Enums/shared-enums/products.enums";
import { SubcategoryEntity } from "../infrastructure/persistence/relational/entity/sub-category.entity";

export class Product{
    @ApiProperty({type:Number})
    @IsNumber()
    id:number

    @ApiProperty({type:String})
    @IsString()
    name:string

    @ApiProperty({type:Number})
    @IsNumber()
    price:number

    @ApiProperty({type:Array})
    @IsString()
    images:string[]

    @ApiProperty({type:Boolean})
    @IsBoolean()
    hasTax?:boolean

    @ApiProperty({type:Number})
    @IsNumber()
    productTax:number

    @ApiProperty({type:String})
    @IsString()
    hsn?:string

    @ApiProperty({type:String})
    @IsString()
    productID?:string

    @ApiProperty({type:String})
    @IsString()
    description:string

    @ApiProperty({type:String})
    @IsString()
    availableColors:string

    @ApiProperty({type:String})
    @IsString()
    availableSizes:string

    @ApiProperty({type:Number})
    @IsNumber()
    stock:number

    @ApiProperty({type:Number})
    @IsNumber()
    purchaseCount?:number

    @ApiProperty({type:Number})
    @IsNumber()
    minWholesaleQuantity:number

    @ApiProperty({type:Number})
    @IsNumber()
    wholeSalePrice:number

    @ApiProperty()
    @IsDate()
    restockedAT?:Date

    @ApiProperty()
    @IsDate()
    stockAdjustedAT?:Date

    @ApiProperty({enum:ProductAvailability})
    @IsEnum(ProductAvailability)
    availability?:ProductAvailability

    @ApiProperty({type:Boolean})
    @IsBoolean()
    isOutOfStock:boolean

    @ApiProperty()
    @IsDate()
    createdAT:Date

    @ApiProperty()
    @IsDate()
    updatedAT:Date

    @ApiProperty({type:()=>SubcategoryEntity})
    subCategory:SubcategoryEntity












}
