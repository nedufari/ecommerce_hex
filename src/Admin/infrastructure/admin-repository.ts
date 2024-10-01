import { FilterUserDto, SortUserDto } from "src/user/dto/query-user.dto";
import { IPaginationOptions } from "src/user/infrastructure/persitence/user.repository";
import { Admin } from "../domain/admin";


export abstract class AdminRepository {

    //create
    abstract create (admin:Admin):Promise <Admin>;

    // find many with pagination
    abstract findManyWithPagination({filterOptions, sortOptions,paginationOptions}:{
      filterOptions?:FilterUserDto | null,
      sortOptions?: SortUserDto[] | null,
      paginationOptions: IPaginationOptions
      
    }):Promise<Admin[]>

    //find by id
    abstract findbyID (id:number):Promise<Admin| null>;

    //find by email
    abstract findbyEmail (email:string):Promise <Admin|null>;

    //find by passwordreset otp
    abstract findbyPasswordResetOtp (otp:string):Promise <Admin|null>;

    //update
    abstract update(id:number, user:Partial<Admin>):Promise<Admin>;

    //remove
    abstract remove (id:number):Promise<void>
  }
  