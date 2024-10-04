import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type, plainToInstance } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { User } from "../domain/user";
import { Status } from "src/Enums/user-enum/user.enums";



export class FilterUserDto {
    @ApiPropertyOptional({ enum:Status })
    @IsOptional()
    @ValidateNested({ each: true })
    status?: Status | null;
  }
  
export class SortUserDto {
    @ApiProperty()
    @Type(() => String)
    @IsString()
    orderBy: keyof User;
  
    @ApiProperty()
    @IsString()
    order: string;
  }
  
  export class QueryUserDto {
    @ApiPropertyOptional()
    @Transform(({ value }) => (value ? Number(value) : 1))
    @IsNumber()
    @IsOptional()
    page?: number;
  
    @ApiPropertyOptional()
    @Transform(({ value }) => (value ? Number(value) : 10))
    @IsNumber()
    @IsOptional()
    limit?: number;
  
    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @Transform(({ value }) =>
      value ? plainToInstance(FilterUserDto, JSON.parse(value)) : undefined,
    )
    @ValidateNested()
    @Type(() => FilterUserDto)
    filters?: FilterUserDto | null;
  
    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @Transform(({ value }) => {
      return value ? plainToInstance(SortUserDto, JSON.parse(value)) : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortUserDto)
    sort?: SortUserDto[] | null;
  }
  