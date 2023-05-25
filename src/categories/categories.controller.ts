import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { response } from 'express';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/guards/accesToken.guards';

@Controller('categories')
@ApiTags('categories')

export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Post()
  async createCategory(@Res() response,@Body() createCategoryDto: CreateCategoryDto) {
   try{
     const newCategory=await this.categoriesService.createCategory(createCategoryDto)
     return response.status(HttpStatus.CREATED).json({
      message:'Category has been created succesfully',
      status:HttpStatus.CREATED,
      data:newCategory
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
  async findAllCategories(@Res() response) {
    try{
      const categoriesData= await this.categoriesService.findAllCategories()
      return response.status(HttpStatus.OK).json({
        message:'all catgories data found successfully',
        status:HttpStatus.OK,
        data:categoriesData
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
    description:"should be an id of a category that exists in database",
    type:String
  })
  async findOneCategory(@Res() response, @Param('id') CategoryId: string) {
    try{
      const existingcategory= await this.categoriesService.findOneCategory(CategoryId)
      return response.status(HttpStatus.OK).json({
        message:'Catregory found by id',
        status:HttpStatus.OK,
        data:existingcategory
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'category id not found',
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
    description:"should be an id of a category that exists in database",
    type:String
  })
  async updateCategory(@Res() response,@Param('id') CategoryId: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try{
      const existingcategory= await this.categoriesService.updateCategory(CategoryId,updateCategoryDto)
      return response.status(HttpStatus.OK).json({
        message:'Catregory updated by id',
        status:HttpStatus.OK,
        data:existingcategory
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'category id not found',
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
    description:"should be an id of a category that exists in database",
    type:String
  })
  async remove(@Res() response, @Param('id') CategoryId: string) {
    try{
      const deletedcategory= await this.categoriesService.removeCategory(CategoryId)
      return response.status(HttpStatus.OK).json({
        message:'Catregory deleted by id',
        status:HttpStatus.OK,
        data:deletedcategory
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'category id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
