import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam, ApiTags,ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { response } from 'express';
import { FileInterceptor ,FilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateEmailReDto } from 'src/mail/dto/create-mail.dto';
import { AccessTokenGuard } from 'src/auth/common/guards/accesToken.guards';

@Controller('user')
@ApiTags('user')

export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        items: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        photo: {
          type: 'string',
          format: 'binary',
        },
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
  async createUser(@Res() response,@Body() createUserDto: CreateUserDto,@UploadedFile()file: Express.Multer.File) {
    try{
      
      createUserDto.photo=file.filename
      console.log(createUserDto)
      const newUser=await this.userService.createUser(createUserDto)
      return response.status(HttpStatus.CREATED).json({
       message:'User has been created succesfully',
       status:HttpStatus.CREATED,
       data:newUser
      })
    }catch(error){
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:error.message,
       status:HttpStatus.BAD_REQUEST,
       data:null
     })
    }
    }

  
  
  @Get()
  async findAllUser(@Res() response) {
    try{
      const usersData= await this.userService.findAllUser()
      return response.status(HttpStatus.OK).json({
        message:'all users data found successfully',
        status:HttpStatus.OK,
        data:usersData
      })

    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  // @Get(':items')
  // @ApiParam({
  //   name:'items',
  //   required:true,
  //   description:"should be an id of a items that exists in database",
  //   type:String
  // })
  // async findAllUserByitem(@Res() response,@Param('items') items:string ) {
  //   try{
  //     console.log(items)
  //     const usersData= await this.userService.findAllUserByitem(items)
  //     return response.status(HttpStatus.OK).json({
  //       message:'all users data found successfully',
  //       status:HttpStatus.OK,
  //       data:usersData
  //     })

  //   }catch(error){
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message:error.message,
  //       status:HttpStatus.BAD_REQUEST,
  //       data:null
  //     })
  //   }
  // }

  
  // @Get(':id')
  // @ApiParam({
  //   name:'id',
  //   required:true,
  //   description:"should be an id of a user that exists in database",
  //   type:String
  // })
  // async findOneUser(@Res() response,@Param('id') UserId: string) {
  //   try{
  //     const existinguser= await this.userService.findOneUser(UserId)
  //     return response.status(HttpStatus.OK).json({
  //       message:'User found by id',
  //       status:HttpStatus.OK,
  //       data:existinguser
  //     })
  //   }catch(error){
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       message:'User id not found',
  //       status:HttpStatus.BAD_REQUEST,
  //       data:null
  //     })
  //   }
  // }


 @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a user that exists in database",
    type:String
  })
  async updateUser(@Res() response,@Param('id') UserId: string, @Body()  updateUserDto: UpdateUserDto ) {
    try{

      const existinguser= await this.userService.updateUser(UserId,updateUserDto)
      return response.status(HttpStatus.OK).json({
        message:'User updated by id',
        status:HttpStatus.OK,
        data:existinguser
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'User id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  
  @Delete(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a user that exists in database",
    type:String
  })
  async removeUser(@Res() response,@Param('id') UserId: string) {
    try{
      const deleteduser= await this.userService.removeUser(UserId)
      return response.status(HttpStatus.OK).json({
        message:'User deleted by id',
        status:HttpStatus.OK,
        data:deleteduser
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'User id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
         email: { type: 'string' }
      }
    }
  }
  )
  @Post("mail")
  async signUp(@Body() req:CreateEmailReDto) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const user={name:req.name,email:req.email,}
    console.log("*****USER*****",user)
    await this.userService.sendUserConfirmation(user, token);
    console.log("*****USER:TOKEN*********",token)
  }


  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
         email: { type: 'string' }
      }
    }
  }
  )
  @Post("reserPassord")
  async reset(@Body() req:CreateEmailReDto) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const user={name:req.name,email:req.email,texte:req.texte}
    console.log("*****USER*****",user)
    await this.userService.reset(user, token);
    console.log("*****USER:TOKEN*********",token)
  }



}
