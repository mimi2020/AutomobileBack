import { ICategory } from './interfaces/category.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  
  constructor(
    @InjectModel('categories')
    private categoryModel:Model<ICategory>
  ){}

  async createCategory (createCategoryDto: CreateCategoryDto):Promise<ICategory> {
    const newCategory=new this.categoryModel(createCategoryDto)
    return newCategory.save()
  }

  async findAllCategories():Promise<ICategory[]> {
    const CategoriesData= await this.categoryModel.find()
    if (!CategoriesData || CategoriesData.length==0){
      throw new NotFoundException("Categories not found")
    }
    return CategoriesData
  }

  async findOneCategory(CategoryId: String):Promise<ICategory> {
    const existingcategory=await this.categoryModel.findById(CategoryId)
    if(!existingcategory){
      throw new NotFoundException(`Categroy with Id ${CategoryId} Not found`)
    }
    return existingcategory
  }

  async updateCategory(CategoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const existingcategory=await this.categoryModel.findByIdAndUpdate(CategoryId,updateCategoryDto)
    if(!existingcategory){
      throw new NotFoundException(`Categroy with Id ${CategoryId} Not found`)
    }
    return existingcategory
  }

  async removeCategory(CategoryId: string) {
    const deletedcategory=await this.categoryModel.findByIdAndRemove(CategoryId)
    if(!deletedcategory){
      throw new NotFoundException(`Categroy with Id ${CategoryId} Not found`)
    }
    return deletedcategory
  }
}
