import { Category } from "src/product/domain/category";
import { Product } from "src/product/domain/product";
import { IPaginationOptions } from "src/user/infrastructure/persitence/user.repository";

export abstract class CategoryRepository{
    abstract create(category:Category):Promise<Category>

    abstract update(id:number, category:Partial<Category>):Promise<Category>

    // abstract findManyWithPagination({filterOptions, sortOptions,paginationOptions}:{
    //     filterOptions?:FilterCategporyDto | null,
    //     sortOptions?: SortCategoryDto[] | null,
    //     paginationOptions: IPaginationOptions
        
    //   }):Promise<Product[]>

    abstract findbyID(id:number):Promise<Category>

    abstract remove(id:number):Promise<void>
}