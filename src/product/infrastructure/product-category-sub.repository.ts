import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "./persistence/relational/repository/product.repository";
import { ProductEntity } from "./persistence/relational/entity/product.entity";
import { Repository } from "typeorm";
import { Product } from "../domain/product";
import { CategoryMapper, ProductMapper, SubCategoryMapper } from "./persistence/relational/mapper/product.mapper";
import { CategoryRepository } from "./persistence/relational/repository/category.repository";
import { Category } from "../domain/category";
import { CategoryEntity } from "./persistence/relational/entity/category.entity";
import { SubcategoryEntity } from "./persistence/relational/entity/sub-category.entity";
import { SubCategory } from "../domain/sub-category";

export class ProductRelationalRepository implements ProductRepository{
    constructor (@InjectRepository(ProductEntity) private productEntityrepository:Repository<ProductEntity>,
   
    ){}

    async create(product: Product): Promise<Product> {

        const  peristenceProduct = ProductMapper.toPersitence(product)
        const savedProduct = await this.productEntityrepository.save(peristenceProduct)
        return ProductMapper.toDomain(savedProduct)
        
    }

    async findbyID(id: number): Promise<Product> {
        const product = await this.productEntityrepository.findOne({where:{id:id}})
        return product ? ProductMapper.toDomain(product):null
        
    }

    async update(id: number, product: Partial<Product>): Promise<Product> {
        await this.productEntityrepository.update(id,ProductMapper.toPersitence(product as Product))
        const updateProduct =await this.productEntityrepository.findOne({where:{id:id}})
        return ProductMapper.toDomain (updateProduct)
       
    }

    async remove(id: number): Promise<void> {
        await this.productEntityrepository.delete(id)
        
    }
}



export class CategoryRelationalRepository implements CategoryRepository{
    constructor ( @InjectRepository(CategoryEntity) private categoryEntityrepository:Repository<CategoryEntity>){}

    async create(category: Category): Promise<Category> {

        const  peristenceCategory = CategoryMapper.toPersistence(category)
        const savedProduct = await this.categoryEntityrepository.save(peristenceCategory)
        return CategoryMapper.toDomain(savedProduct)
        
    }

    async findbyID(id: number): Promise<Category> {
        const category = await this.categoryEntityrepository.findOne({where:{id:id}})
        return category ? CategoryMapper.toDomain(category):null
        
    }

    async update(id: number, category: Partial<Category>): Promise<Category> {
        await this.categoryEntityrepository.update(id,CategoryMapper.toPersistence(category as Category))
        const updateCategory =await this.categoryEntityrepository.findOne({where:{id:id}})
        return CategoryMapper.toDomain (updateCategory)
       
    }

    async remove(id: number): Promise<void> {
        await this.categoryEntityrepository.delete(id)
        
    }
}



export class SubCategoryRelationalRepository implements CategoryRepository{
    constructor ( @InjectRepository(CategoryEntity) private subcategoryEntityrepository:Repository<SubcategoryEntity>){}

    async create(subcategory: SubCategory): Promise<SubCategory> {

        const  peristencesubCategory = SubCategoryMapper.toPersistence(subcategory)
        const savedsubCategory = await this.subcategoryEntityrepository.save(peristencesubCategory)
        return SubCategoryMapper.toDomain(savedsubCategory)
        
    }

    async findbyID(id: number): Promise<SubCategory> {
        const subcategory = await this.subcategoryEntityrepository.findOne({where:{id:id}})
        return subcategory ? SubCategoryMapper.toDomain(subcategory):null
        
    }

    async update(id: number, subcategory: Partial<SubCategory>): Promise<SubCategory> {
        await this.subcategoryEntityrepository.update(id,SubCategoryMapper.toPersistence(subcategory as SubCategory))
        const updatesubCategory =await this.subcategoryEntityrepository.findOne({where:{id:id}})
        return SubCategoryMapper.toDomain (updatesubCategory)
       
    }

    async remove(id: number): Promise<void> {
        await this.subcategoryEntityrepository.delete(id)
        
    }
}