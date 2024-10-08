import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Role, Status } from "src/Enums/user-enum/user.enums";

import { EntityRelationalHelper } from "src/utils/relational-entity.helper";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'admin'})
export class AdminEntity  extends EntityRelationalHelper{

    @ApiProperty({type:Number})
    @PrimaryGeneratedColumn()
    id :number

    @ApiProperty({type:String, example:'admin.ned@example.com'})
    @Column({nullable:true, unique:true})
    @Expose()
    email:string

    @Column({ nullable: true })
    @Exclude({ toPlainOnly: true })
    password: string;

    @ApiProperty({type:String, example:'nedu'})
    @Index()
    @Column({nullable:true,type:String})
    firstname:string

    @ApiProperty({type:String, example:'james'})
    @Index()
    @Column({nullable:true,type:String})
    lastname:string

    @ApiProperty({type:String, example:'+2349032504705'})
    @Index()
    @Column({nullable:true,type:String})
    phoneNumber:string


    @ApiProperty({type:String})
    @Index()
    @Column({nullable:true,type:String})
    profilePics:string

    @ApiProperty({enum:Role})
    @Index()
    @Column({nullable:true,type:'enum', enum:Role})
    role:Role

    @ApiProperty({enum:Status})
    @Index()
    @Column({nullable:true,type:'enum', enum:Status})
    status:Status

    @ApiProperty()
    @Column({type:'timestamp'})
    createdAt: Date;
  
    @ApiProperty()
    @Column({type:'timestamp'})
    updatedAt: Date;
  
    @ApiProperty()
    @Column({type:'timestamp'})
    deletedAt: Date;

    @ApiProperty({type:Boolean})
    @Column({type:'boolean', default:false})
    isVerified:boolean

    @ApiProperty({type:String})
    @Column({type:String,})
    resetPasswordOtp:string

    @ApiProperty({type:Date})
    @Column({type:'timestamp',})
    resetPasswordOtpExpirationTime:Date

   



    //other foreign keys  -> favourites, orders,





}