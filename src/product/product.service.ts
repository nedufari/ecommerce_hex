import { Injectable } from '@nestjs/common';
import { ProductRepository } from './infrastructure/persistence/relational/repository/product.repository';
import { NotificationsService } from 'src/utils/services/notifications.service';
import {
  ResponseService,
  StandardResponse,
} from 'src/utils/services/response.service';
import { CloudinaryService } from 'src/utils/services/claudinary.service';
import { Admin } from 'src/Admin/domain/admin';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './domain/product';
import { UploadApiResponse } from 'cloudinary';
import { GeneatorService } from 'src/utils/services/generator.service';
import { SubCategoryRepository } from './infrastructure/persistence/relational/repository/sub-category.repository';

@Injectable()
export class ProdcutMgtService {
  constructor(
    private productRepository: ProductRepository,
    private notificationService: NotificationsService,
    private responseService: ResponseService,
    private claudinaryService: CloudinaryService,
    private generatorService: GeneatorService,
    private subcategoryRepository: SubCategoryRepository,
  ) {}

  //create product
  async createProduct(
    admin: Admin,
    dto: CreateProductDto,
    imagefiles: Express.Multer.File[],
  ): Promise<StandardResponse<Product>> {
    try {
      const imagefileurls: string[] = [];
      for (const file of imagefiles) {
        try {
          const result: UploadApiResponse =
            await this.claudinaryService.uploadFile(file);
          imagefileurls.push(result.secure_url);
        } catch (error) {
          return this.responseService.internalServerError(
            'failed to upload product images',
            error.message,
          );
        }
      }

      let subcategory;

      if (dto.subCategoryId) {
        const subcategory = await this.subcategoryRepository.findbyID(
          dto.subCategoryId,
        );
        if (!subcategory)
          return this.responseService.notFound('sub category not found');
      }

      const product = await this.productRepository.create({
        name: dto.name,
        price: dto.price,
        description: dto.description,
        images: imagefileurls,
        stock: dto.stock,
        productID: `AdPr${this.generatorService.generateTrackingID()}`,
        availableColors: dto.availableColors,
        availableSizes: dto.availableSizes,
        productTax: dto.productTax ?? 1.0,
        hasTax: !!dto.productTax,
        createdAT: new Date(),
        id: 0,
        minWholesaleQuantity: dto.minWholesaleQuantity,
        wholeSalePrice: dto.wholeSalePrice,
        isOutOfStock: false,
        updatedAT: undefined,
        subCategory: subcategory,
      });

      //notification
      await this.notificationService.create({
        message: `Product with ID ${await product.productID}, has been created successfully.`,
        subject: 'Product Creation',
        account: admin.id //saves when the user is created
      });


      return this.responseService.success(
        'product successfully created',
        product,
      );
    } catch (error) {
      return this.responseService.internalServerError(
        'Error creating a Product',
        error.message,
      );
    }
  }

  
  //update product
  //restock product
  //fetch one product
  //fetch all products
  //delete a product and nullify its
}
