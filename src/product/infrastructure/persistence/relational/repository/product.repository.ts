import { Product } from "src/product/domain/product";
import { IPaginationOptions } from "src/user/infrastructure/persitence/user.repository";

export abstract class ProductRepository{
    abstract create(product:Product):Promise<Product>

    abstract update(id:number, product:Partial<Product>):Promise<Product>

    // abstract findManyWithPagination({filterOptions, sortOptions,paginationOptions}:{
    //     filterOptions?:FilterProductDto | null,
    //     sortOptions?: SortProductDto[] | null,
    //     paginationOptions: IPaginationOptions
        
    //   }):Promise<Product[]>

    abstract findbyID(id:number):Promise<Product>

    abstract remove(id:number):Promise<void>
}