import { IVoiture } from './interfaces/voitures.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVoitureDto } from './dto/create-voiture.dto';
import { UpdateVoitureDto } from './dto/update-voiture.dto';
import { Model } from 'mongoose';
import { ICategory } from 'src/categories/interfaces/category.interface';

@Injectable()
export class VoituresService {
  constructor(
    @InjectModel('voitures')
    private VoituresModel:Model<IVoiture>,
    @InjectModel('categories')
    private categoryModel:Model<ICategory>
  ){}
  
  async createCar(createVoitureDto: CreateVoitureDto) :Promise<IVoiture>{
    const newVoiture= await new this.VoituresModel(createVoitureDto)
    await this.categoryModel.updateOne({_id:newVoiture.ID_category},{$push:{ListOfVoitures:newVoiture._id}})
    return newVoiture.save()
    }

  async findAllCars():Promise<IVoiture[]> {
    const VoituresData= await this.VoituresModel.find()
    if (!VoituresData || VoituresData.length==0){
      throw new NotFoundException("Cars not found")
    }
    return VoituresData
  }

  async findOneCar(VoitureId: String) :Promise<IVoiture> {
    const existingvoiture=await this.VoituresModel.findById(VoitureId)
    if(!existingvoiture){
      throw new NotFoundException(`Car with Id ${VoitureId} Not found`)
    }
    return existingvoiture
  }

  async updateCar(VoitureId: String, updateVoitureDto: UpdateVoitureDto) {
    const existingVoiture=await this.VoituresModel.findByIdAndUpdate(VoitureId,updateVoitureDto)
    if(!existingVoiture){
      throw new NotFoundException(`CAr with Id ${VoitureId} Not found`)
    }
    return existingVoiture
  }

  async removeCar(VoitureId: String) {
    const deletedvoiture=await this.VoituresModel.findById(VoitureId)
    if(!deletedvoiture){
      throw new NotFoundException(`Car with Id ${VoitureId} Not found`)
    }
    await Promise.all([
      this.VoituresModel.deleteOne({_id:VoitureId}).exec(),
      this.categoryModel.updateOne({_id:deletedvoiture.ID_category},{$pull:{ListOfVoitures:VoitureId}})
    ])
    return deletedvoiture
  }
}
