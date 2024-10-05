import { Module } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { CategoryRelationalRepository, ProductRelationalRepository, SubCategoryRelationalRepository } from '../../product-category-sub.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CategoryEntity } from './entity/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { SubcategoryEntity } from './entity/sub-category.entity';
import { SubCategoryRepository } from './repository/sub-category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, SubcategoryEntity])
  ],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductRelationalRepository,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryRelationalRepository,
    },
    {
      provide: SubCategoryRepository,
      useClass: SubCategoryRelationalRepository,
    },
  ],
  exports: [ProductRepository, CategoryRepository, SubCategoryRepository],
})
export class RelationalProductCategorySubPersistenceModule {}