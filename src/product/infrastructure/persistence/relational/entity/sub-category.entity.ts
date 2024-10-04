import { ApiProperty } from '@nestjs/swagger';
import { EntityRelationalHelper } from 'src/utils/relational-entity.helper';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from './category.entity';

@Entity('sub-categories')
export class SubcategoryEntity extends EntityRelationalHelper {
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

  @ApiProperty({ type: () => ProductEntity })
  @OneToMany(() => ProductEntity, (product) => product.subCategory, {
    nullable: true,
  })
  products: ProductEntity[];

  @ApiProperty({ type: () => CategoryEntity })
  @OneToMany(() => CategoryEntity, (category) => category.subCategories, {
    nullable: true,
  })
  category: CategoryEntity[];
}
