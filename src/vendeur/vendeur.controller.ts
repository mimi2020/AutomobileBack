import { ApiBody, ApiConsumes, ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, HttpStatus, UseGuards } from '@nestjs/common';
import { VendeurService } from './vendeur.service';
import { CreateVendeurDto } from './dto/create-vendeur.dto';
import { UpdateVendeurDto } from './dto/update-vendeur.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/common/guards/accesToken.guards';

@Controller('vendeur')
@ApiTags('vendeur')

export class VendeurController {
  constructor(private readonly vendeurService: VendeurService) {}

  
  
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        Vendeur_proprietere:{type:'boolean'},
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
  async createVendeur(@Res() response,@Body() createVendeurDto: CreateVendeurDto,@UploadedFile()file: Express.Multer.File) {
    try{
      // createVendeurDto.photo=file.filename
      const newVendeur=await this.vendeurService.createVendeur(createVendeurDto)
      return response.status(HttpStatus.CREATED).json({
       message:'Vendeur has been created succesfully',
       status:HttpStatus.CREATED,
       data:newVendeur
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
  async findAllVendeur(@Res() response) {
    try{
      const VendeurData= await this.vendeurService.findAllVendeur()
      return response.status(HttpStatus.OK).json({
        message:'all vendeurs data found successfully',
        status:HttpStatus.OK,
        data:VendeurData
      })

    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a vendeur that exists in database",
    type:String
  })
  async findOneVendeur(@Res() response,@Param('id') VendeurId: string) {
    try{
      const existingvendeur= await this.vendeurService.findOneVendeur(VendeurId)
      return response.status(HttpStatus.OK).json({
        message:'Vendeur found by id',
        status:HttpStatus.OK,
        data:existingvendeur
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Vendeur id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }



  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a vendeur that exists in database",
    type:String
  })
  async updateVendeur(@Res() response,@Param('id') VendeurId: string, @Body() updateVendeurDto: UpdateVendeurDto) {
    try{
      const existingvendeur= await this.vendeurService.updateVendeur(VendeurId,updateVendeurDto)
      return response.status(HttpStatus.OK).json({
        message:'Vendeur updated by id',
        status:HttpStatus.OK,
        data:existingvendeur
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Vendeur id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a vendeur that exists in database",
    type:String
  })
  async removeVendeur(@Res() response,@Param('id') VendeurId: string) {
    try{
      const deletedvendeur= await this.vendeurService.removeVendeur(VendeurId)
      return response.status(HttpStatus.OK).json({
        message:'Customer deleted by id',
        status:HttpStatus.OK,
        data:deletedvendeur
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Customer id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
