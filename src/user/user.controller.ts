import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { Body, Controller, HttpCode, HttpStatus, Patch, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtGuard } from "src/Auth/Guard/jwt.guard";
import { RoleGuard } from "src/Auth/Guard/role.guards";
import { User } from "./domain/user";
import { updateUserDto } from "./dto/update-user.dto";
import { StandardResponse } from "src/utils/services/response.service";
import { FileInterceptor } from "@nestjs/platform-express";


@ApiTags('User Service')
@ApiBearerAuth()
@UseGuards(JwtGuard,RoleGuard)
@Controller({
  path: 'user',
  version: '1',
})
export class UserController{
    constructor(private readonly userService:UserService){}


   
  @Patch('update-record')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponse<User>) },
        {
          properties: {
            payload: {
              $ref: getSchemaPath(User),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'update user records' })
  @HttpCode(HttpStatus.OK)
  async UpdateRecord (@Body()dto:updateUserDto,@Req()req):Promise<StandardResponse<User>>{
    return await this.userService.UpdateUser(req.user,dto)
  }

    //update inckuding adding pics
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
            profilePics: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @Patch('upload-profilePics')
    @ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(StandardResponse<User>) },
          {
            properties: {
              payload: {
                $ref: getSchemaPath(User),
              },
            },
          },
        ],
      },
    })
    @ApiOperation({ summary: 'upload user profile pics' })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('profilePics'))
    async UploadProfilePics (@Req()req,@UploadedFile()file:Express.Multer.File):Promise<StandardResponse<User>>{
      return await this.userService.uploadUserProfilePics(req.user,file)
    }

    

    //fetch all with pagination 

    // search  for order 

    

    // add to cart 

    //checkout 

    // remove from cart 

    // add to bbay registry 

    // make payment 


}