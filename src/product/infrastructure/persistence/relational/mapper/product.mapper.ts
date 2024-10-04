import { Product } from 'src/product/domain/product';
import { ProductEntity } from '../entity/product.entity';
import { CategoryEntity } from '../entity/category.entity';
import { Category } from 'src/product/domain/category';
import { SubCategory } from 'src/product/domain/sub-category';
import { SubcategoryEntity } from '../entity/sub-category.entity';

//product mapper
export class ProductMapper {
  //map persitent data to domain
  static toDomain(raw: ProductEntity): Product {
    const productEntity = new Product();
    productEntity.id = raw.id;
    productEntity.name = raw.name;
    productEntity.description = raw.description;
    productEntity.hsn = raw.hsn;
    productEntity.availability = raw.availability;
    productEntity.availableColors = raw.availableColors;
    productEntity.availableSizes = raw.availableSizes;
    productEntity.hasTax = raw.hasTax;
    productEntity.images = raw.images;
    productEntity.isOutOfStock = raw.isOutOfStock;
    productEntity.wholeSalePrice = raw.wholeSalePrice;
    productEntity.minWholesaleQuantity = raw.minWholesaleQuantity;
    productEntity.productID = raw.productID;
    productEntity.price = raw.price;
    productEntity.stock = raw.stock;
    productEntity.restockedAT = raw.restockedAT;
    productEntity.stockAdjustedAT = raw.stockAdjustedAT;
    productEntity.createdAT = raw.createdAT;
    productEntity.updatedAT = raw.updatedAT;
    productEntity.purchaseCount = raw.purchaseCount;
    productEntity.subCategory = raw.subCategory;
    return productEntity;
  }

  //map domain to persistence
  static toPersitence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();

    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.hsn = domainEntity.hsn;
    persistenceEntity.availability = domainEntity.availability;
    persistenceEntity.availableColors = domainEntity.availableColors;
    persistenceEntity.availableSizes = domainEntity.availableSizes;
    persistenceEntity.hasTax = domainEntity.hasTax;
    persistenceEntity.images = domainEntity.images;
    persistenceEntity.isOutOfStock = domainEntity.isOutOfStock;
    persistenceEntity.wholeSalePrice = domainEntity.wholeSalePrice;
    persistenceEntity.minWholesaleQuantity = domainEntity.minWholesaleQuantity;
    persistenceEntity.productID = domainEntity.productID;
    persistenceEntity.price = domainEntity.price;
    persistenceEntity.stock = domainEntity.stock;
    persistenceEntity.restockedAT = domainEntity.restockedAT;
    persistenceEntity.stockAdjustedAT = domainEntity.stockAdjustedAT;
    persistenceEntity.createdAT = domainEntity.createdAT;
    persistenceEntity.updatedAT = domainEntity.updatedAT;
    persistenceEntity.purchaseCount = domainEntity.purchaseCount;
    persistenceEntity.subCategory = domainEntity.subCategory;
    return persistenceEntity;
  }
}

//category mapper
export class CategoryMapper {
  //from persistent to domain
  static toDomain(raw: CategoryEntity): Category {
    const domainEntity = new Category();
    domainEntity.id = raw.id;
    domainEntity.banner = raw.banner;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.createdAT = raw.createdAT;
    domainEntity.updatedAT = raw.updatedAT;
    domainEntity.subcategories = raw.subCategories;
    return domainEntity;
  }

  //from domain to persistent
  static toPersistence(domainEntity: Category): CategoryEntity {
    const persistenceEntity = new CategoryEntity();

    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.name = domainEntity.name;
    persistenceEntity.banner = domainEntity.banner;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.createdAT = domainEntity.createdAT;
    persistenceEntity.updatedAT = domainEntity.updatedAT;
    persistenceEntity.subCategories = domainEntity.subcategories;
    return persistenceEntity;
  }
}


//subcategory mapper
export class SubCategoryMapper {
    //from persistent to domain
    static toDomain(raw: SubcategoryEntity): SubCategory {
      const domainEntity = new SubCategory();
      domainEntity.id = raw.id;
      domainEntity.banner = raw.banner;
      domainEntity.name = raw.name;
      domainEntity.description = raw.description;
      domainEntity.createdAT = raw.createdAT;
      domainEntity.updatedAT = raw.updatedAT;
      domainEntity.products = raw.products;
      domainEntity.category = raw.category
      return domainEntity;
    }
  
    //from domain to persistent
    static toPersistence(domainEntity: SubCategory): SubcategoryEntity {
      const persistenceEntity = new SubcategoryEntity();
  
      if (domainEntity.id && typeof domainEntity.id === 'number') {
        persistenceEntity.id = domainEntity.id;
      }
  
      persistenceEntity.name = domainEntity.name;
      persistenceEntity.banner = domainEntity.banner;
      persistenceEntity.description = domainEntity.description;
      persistenceEntity.createdAT = domainEntity.createdAT;
      persistenceEntity.updatedAT = domainEntity.updatedAT;
      persistenceEntity.products = domainEntity.products;
      persistenceEntity.category = domainEntity.category
      return persistenceEntity;
    }
  }
