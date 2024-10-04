import { ApiProperty } from "@nestjs/swagger";
import { ProductAvailability } from "src/Enums/shared-enums/products.enums";
import { EntityRelationalHelper } from "src/utils/relational-entity.helper";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubcategoryEntity } from "./sub-category.entity";

@Entity({name:'products'})
export class ProductEntity extends EntityRelationalHelper{
    @ApiProperty({type:Number})
    @PrimaryGeneratedColumn()
    @Index()
    id:number

    @ApiProperty({type:String})
    @Column({nullable:true})
    @Index()
    name:string

    @ApiProperty({type:Number})
    @Column({nullable:true,type:'decimal', default:0.0})
    @Index()
    price:number

    @ApiProperty({type:Array})
    @Column({nullable:true,type:'simple-array'})
    @Index()
    images:string[]

    @ApiProperty({type:Boolean})
    @Column({nullable:true, type:'boolean', default:false})
    @Index()
    hasTax:boolean

    @ApiProperty({type:Number})
    @Column({nullable:true,type:'numeric'})
    @Index()
    productTax:number

    @ApiProperty({type:String})
    @Column({nullable:true})
    @Index()
    hsn:string

    @ApiProperty({type:String})
    @Column({nullable:true})
    @Index()
    productID:string

    @ApiProperty({type:String})
    @Column({nullable:true})
    @Index()
    description:string

    @ApiProperty({type:String})
    @Column({nullable:true})
    @Index()
    availableColors:string

    @ApiProperty({type:String})
    @Column({nullable:true})
    @Index()
    availableSizes:string

    @ApiProperty({type:Number})
    @Column({nullable:true,type:'numeric'})
    @Index()
    stock:number

    @ApiProperty({type:Number})
    @Column({nullable:true,type:'numeric'})
    @Index()
    purchaseCount:number 

    @ApiProperty({type:Number})
    @Column({nullable:true,type:'numeric'})
    @Index()
    minWholesaleQuantity:number

    @ApiProperty({type:Number})
    @Column({nullable:true,type:'numeric'})
    @Index()
    wholeSalePrice:number


    @ApiProperty()
    @Column({ nullable: true, type: 'timestamp' })
    restockedAT: Date;
  
   
    @Column({ nullable: true, type: 'timestamp' })
    stockAdjustedAT: Date;
  
    @ApiProperty({enum:ProductAvailability})
    @Column({ nullable: true, type: 'enum', enum: ProductAvailability })
    availability: ProductAvailability;
  
    @ApiProperty({type:Boolean})
    @Column({ nullable: true, type: 'boolean' })
    isOutOfStock: boolean;


    @ApiProperty()
    @Column({ nullable: true, type: 'timestamp' })
    createdAT: Date;
  
    @ApiProperty()
    @Column({ nullable: true, type: 'timestamp' })
    updatedAT: Date;

    @ApiProperty({type:()=>SubcategoryEntity})
    @ManyToOne(()=> SubcategoryEntity, (sub)=>sub.products)
    subCategory:SubcategoryEntity











}