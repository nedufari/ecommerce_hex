import { User } from "src/user/domain/user";
import { FilterUserDto, SortUserDto } from "src/user/dto/query-user.dto";

export interface IPaginationOptions {
  page: number;
  limit: number;
}

export abstract class UserRepository {

  // The abstract repository defines the interface that any concrete repository must implement. It's a contract that ensures all implementations will have the same methods, regardless of the underlying data source.
  
  
  //create
  abstract create (user:User):Promise<User>;

  // find many with pagination
  abstract findManyWithPagination({filterOptions, sortOptions,paginationOptions}:{
    filterOptions?:FilterUserDto | null,
    sortOptions?: SortUserDto[] | null,
    paginationOptions: IPaginationOptions
    
  }):Promise<User[]>

  //find by id
  abstract findbyID (id:number):Promise<User | null>;

  //find by email
  abstract findbyEmail (email:string):Promise <User|null>;

    //find by passwordreset otp
    abstract findbyPasswordResetOtp (otp:string):Promise <User|null>;

  //update
  abstract update(id:number, user:Partial<User>):Promise<User>;

  //remove
  abstract remove (id:number):Promise<void>
}
