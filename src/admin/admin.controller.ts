import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AccessTokenGuard } from 'src/auth/common/guards/accesToken.guards';

@Controller('admin')
@ApiTags('admin')


export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  
  
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        photo: {
          type: 'string',
          format: 'binary',
        },
        Permission: { type: 'number' },
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination:"./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  
  @Post()
  async createAdmin(@Res()response ,@Body() createAdminDto: CreateAdminDto,@UploadedFile()file: Express.Multer.File) {
    try{
      // createAdminDto.photo=file.filename
      const newAdmin=await this.adminService.createAdmin(createAdminDto)
      return response.status(HttpStatus.CREATED).json({
       message:'Admin has been created succesfully',
       status:HttpStatus.CREATED,
       data:newAdmin
      })
    }catch(error){
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:error.message,
       status:HttpStatus.BAD_REQUEST,
       data:null
     })
    }
  }

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Get()
  async findAllAdmin(@Res() response) {
    try{
      const AdminData= await this.adminService.findAllAdmin()
      return response.status(HttpStatus.OK).json({
        message:'all admins data found successfully',
        status:HttpStatus.OK,
        data:AdminData
      })

    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a customer that exists in database",
    type:String
  })
  async findOneAdmin(@Res() response,@Param('id') AdminId: string) {

    try{
      const existingadmin= await this.adminService.findOneAdmin(AdminId)
      return response.status(HttpStatus.OK).json({
        message:'Admin found by id',
        status:HttpStatus.OK,
        data:existingadmin
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Admin id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }

  }

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a customer that exists in database",
    type:String
  })
  async updateAdmin(@Res() response,@Param('id') AdminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    try{
      const existingadmin= await this.adminService.updateAdmin(AdminId,updateAdminDto)
      return response.status(HttpStatus.OK).json({
        message:'Admin found by id',
        status:HttpStatus.OK,
        data:existingadmin
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Admin id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a customer that exists in database",
    type:String
  })
  async removeAdmin(@Res() response,@Param('id') AdminId: string) {
    try{
      const deletedadmin= await this.adminService.removeAdmin(AdminId)
      return response.status(HttpStatus.OK).json({
        message:'Admin found by id',
        status:HttpStatus.OK,
        data:deletedadmin
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Admin id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
