import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  import { ApiProperty } from '@nestjs/swagger';
import { EntityRelationalHelper } from '../relational-entity.helper';
import { Role } from 'src/Enums/user-dto/shared-dto/user.enums';
 
  
  @Entity({ name: 'authOtp' })
  export class OtpEntity extends EntityRelationalHelper {
    @ApiProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ type: String })
    @Column({ type: String, unique: true, nullable: true })
    otp: string;
  
    @ApiProperty({ type: String })
    @Column({ unique: false })
    email: string;
  
    @ApiProperty({ type: String })
    @Column({ type: 'enum', enum: Role, nullable: true })
    role: Role;
  
    @ApiProperty({ type: Boolean })
    @Column({ type: 'boolean', default: false })
    verified: boolean;
  
    @ApiProperty()
    @Column({ nullable: true, type: 'timestamp' })
    expiration_time: Date;
  
    @ApiProperty()
    @Column({ nullable: true, type: 'timestamp' })
    resend_time: Date;
  
    @ApiProperty()
    @CreateDateColumn()
    created_at: Date;
  }
  