import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { Roles } from "src/Auth/Decorators/role.decorator";
import { JwtGuard } from "src/Auth/Guard/jwt.guard";
import { RoleGuard } from "src/Auth/Guard/role.guards";
import { Role } from "src/Enums/user-enum/user.enums";
import { ProdcutMgtService } from "./product.service";
import { StandardResponse } from "src/utils/services/response.service";
import { Product } from "./domain/product";
import { CreateProductDto } from "./dto/product.dto";
import { FilesInterceptor } from "@nestjs/platform-express";


@ApiBearerAuth()
@UseGuards(JwtGuard,RoleGuard)
@Roles(Role.ADMIN)
@ApiTags('Product Management')
@Controller({
  path: 'product-mgt',
  version: '1',
})

export class ProductMgtController{
    constructor(private productmgtService:ProdcutMgtService){}

    @Post('create-product')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
            productImages: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(StandardResponse<Product>) },
          {
            properties: {
              payload: {
                $ref: getSchemaPath(Product),
              },
            },
          },
        ],
      },
    })
    @ApiOperation({ summary: 'create product with image files' })
    @UseInterceptors(FilesInterceptor('profilePics',3))
    async createProduct(@Req()req, @Body()dto:CreateProductDto,@UploadedFiles()file:Express.Multer.File[]):Promise<StandardResponse<Product>>{
        return await this.productmgtService.createProduct(req.user,dto,file)

    }
}
