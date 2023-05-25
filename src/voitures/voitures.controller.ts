import { ApiTags, ApiParam, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { VoituresService } from './voitures.service';
import { CreateVoitureDto } from './dto/create-voiture.dto';
import { UpdateVoitureDto } from './dto/update-voiture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AccessTokenGuard } from '../auth/common/guards/accesToken.guards';

@Controller('voitures')
@ApiTags('voitures')

export class VoituresController {
  constructor(private readonly voituresService: VoituresService) {}

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        Marque: { type: 'string' },
        Governorat: { type: 'string' },
        Annee: { type: 'string' },
        Adresse: { type: 'string' },
        name: { type: 'string' },
        Description: { type: 'string' },
        Energie: { type: 'string' },
        Puissance_fiscal: { type: 'string' },
        Boite: { type: 'string' },
        Couleur: { type: 'string' },
        ID_category: { type: 'object' },
        Kilometrage: { type: 'string' },
        Tel: { type: 'number' },
        Photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("Photo", {
      storage: diskStorage({
        destination:"./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  @Post()
  async createCar(@Res() response,@Body() createVoitureDto: CreateVoitureDto,@UploadedFile()file: Express.Multer.File) {
    try{
      createVoitureDto.Photo=file.filename

      const newCar=await this.voituresService.createCar(createVoitureDto)
      return response.status(HttpStatus.CREATED).json({
       message:'Car has been created succesfully',
       status:HttpStatus.CREATED,
       data:newCar
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
  async findAllCars(@Res() response) {
    try{
      const VoituresData= await this.voituresService.findAllCars()
      return response.status(HttpStatus.OK).json({
        message:'all cars data found successfully',
        status:HttpStatus.OK,
        data:VoituresData
      })

    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Get(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a car that exists in database",
    type:String
  })
  async findOneCar(@Res() response,@Param('id') VoitureId: string) {
    try{
      const existingvoiture= await this.voituresService.findOneCar(VoitureId)
      return response.status(HttpStatus.OK).json({
        message:'Car found by id',
        status:HttpStatus.OK,
        data:existingvoiture
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'category id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  // @ApiConsumes("multipart/form-data")
  // @UseInterceptors(
  //   FileInterceptor("photo", {
  //     storage: diskStorage({
  //       destination:"./upload",
  //       filename: (_request, file, callback) =>
  //         callback(null, `${new Date().getTime()}-${file.originalname}`),
  //     }),
  //   }),
  // )

  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a car that exists in database",
    type:String
  })
  async updateCar(@Res() response,@Param('id') VoitureId: string, @Body() updateVoitureDto: UpdateVoitureDto) {
    try{
      const existingvoiture= await this.voituresService.updateCar(VoitureId,updateVoitureDto)
      return response.status(HttpStatus.OK).json({
        message:'Car updated by id',
        status:HttpStatus.OK,
        data:existingvoiture
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Car id not found',
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
    description:"should be an id of a car that exists in database",
    type:String
  })
  async removeCar(@Res() response,@Param('id') VoitureId: string) {
    try{
      const deletedvoiture= await this.voituresService.removeCar(VoitureId)
      return response.status(HttpStatus.OK).json({
        message:'Car deleted by id',
        status:HttpStatus.OK,
        data:deletedvoiture
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Car id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
