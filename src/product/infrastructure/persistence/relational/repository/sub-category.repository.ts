import { Category } from "src/product/domain/category";
import { Product } from "src/product/domain/product";
import { SubCategory } from "src/product/domain/sub-category";
import { IPaginationOptions } from "src/user/infrastructure/persitence/user.repository";

export abstract class SubCategoryRepository{
    abstract create(subcategory:SubCategory):Promise<SubCategory>

    abstract update(id:number, subcategory:Partial<SubCategory>):Promise<SubCategory>

    // abstract findManyWithPagination({filterOptions, sortOptions,paginationOptions}:{
    //     filterOptions?:FilterCategporyDto | null,
    //     sortOptions?: SortCategoryDto[] | null,
    //     paginationOptions: IPaginationOptions
        
    //   }):Promise<Product[]>

    abstract findbyID(id:number):Promise<SubCategory>

    abstract remove(id:number):Promise<void>
}