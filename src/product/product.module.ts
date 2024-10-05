import { Module } from '@nestjs/common';
import { RelationalProductCategorySubPersistenceModule } from './infrastructure/persistence/relational/product-category-sub.relational.persitence.module';
import { CloudinaryService } from 'src/utils/services/claudinary.service';
import { NotificationsService } from 'src/utils/services/notifications.service';
import { ResponseService } from 'src/utils/services/response.service';
import { GeneatorService } from 'src/utils/services/generator.service';
import { ProdcutMgtService } from './product.service';
import { ProductMgtController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsEntity } from 'src/utils/sharedEntities/notification.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RelationalProductCategorySubPersistenceModule,TypeOrmModule.forFeature([NotificationsEntity])]
,   
  providers: [
    CloudinaryService,
    NotificationsService,
    ResponseService,
    GeneatorService,
    ProdcutMgtService,
    JwtService
  ],
  controllers: [ProductMgtController],
  exports: [
  RelationalProductCategorySubPersistenceModule,
  ],
})
export class ProductModule {}
