import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/guards/accesToken.guards';

@Controller('inspection')
@ApiTags('inspection')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Post()
  async createInspection(@Res() response, @Body() createInspectionDto: CreateInspectionDto) {
    try{
      const newInspection=await this.inspectionService.createInspection(createInspectionDto)
      return response.status(HttpStatus.CREATED).json({
       message:'Inspection has been created succesfully',
       status:HttpStatus.CREATED,
       data:newInspection
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
  async findAllInspection(@Res() response) {
    try{
      const InspectionData= await this.inspectionService.findAllInspection()
      return response.status(HttpStatus.OK).json({
        message:'all inspections data found successfully',
        status:HttpStatus.OK,
        data:InspectionData
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
    description:"should be an id of an inspection that exists in database",
    type:String
  })
  async findOneInspection(@Res() response,@Param('id') InspectionId: string) {
    try{
      const existinginspection= await this.inspectionService.findOneInspection(InspectionId)
      return response.status(HttpStatus.OK).json({
        message:'inspection found by id',
        status:HttpStatus.OK,
        data:existinginspection
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'inspection id not found',
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
    description:"should be an id of an inspection that exists in database",
    type:String
  })
  async updateinspection(@Res() response,@Param('id') InspectionId: string, @Body() updateInspectionDto: UpdateInspectionDto) {
    try{
      const existinginspection= await this.inspectionService.updateinspection(InspectionId,updateInspectionDto)
      return response.status(HttpStatus.OK).json({
        message:'inspection updated by id',
        status:HttpStatus.OK,
        data:existinginspection
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'inspection id not found',
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
    description:"should be an id of an inspection that exists in database",
    type:String
  })
  async removeinspection(@Res() response,@Param('id') InspectionId: string) {
    try{
      const deletedinspection= await this.inspectionService.removeinspection(InspectionId)
      return response.status(HttpStatus.OK).json({
        message:'inspection deleted by id',
        status:HttpStatus.OK,
        data:deletedinspection
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'inspection id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
