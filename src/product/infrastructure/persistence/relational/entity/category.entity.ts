import { ApiProperty } from '@nestjs/swagger';
import { EntityRelationalHelper } from 'src/utils/relational-entity.helper';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubcategoryEntity } from './sub-category.entity';

@Entity('categories')
export class CategoryEntity extends EntityRelationalHelper {
  @ApiProperty({ type: Number })
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @Index()
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ type: String })
  @Index()
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ type: String })
  @Index()
  @Column({ nullable: true })
  banner: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'timestamp' })
  createdAT: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updatedAT: Date;

  @ApiProperty({ type: () => SubcategoryEntity })
  @OneToMany(() => SubcategoryEntity, (sub) => sub.category, { nullable: true })
  subCategories: SubcategoryEntity[];
}
