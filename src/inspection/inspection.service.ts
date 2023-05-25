import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { Model } from 'mongoose';
import { IInspection } from './interfaces/inspection.interfaces';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel('inspection')
    private InspectionModel:Model<IInspection>
  ){}
  
  async createInspection(createInspectionDto: CreateInspectionDto):Promise<IInspection> {
    const newInspection=new this.InspectionModel(createInspectionDto)
    return newInspection.save()
  }

  async findAllInspection():Promise<IInspection[]> {
    const InspectionData= await this.InspectionModel.find()
    if (!InspectionData || InspectionData.length==0){
      throw new NotFoundException("Inspection not found")
    }
    return InspectionData 
  }

  async findOneInspection(InspectionId: string):Promise<IInspection>  {
    const existinginspection=await this.InspectionModel.findById(InspectionId)
    if(!existinginspection){
      throw new NotFoundException(`inspection with Id ${InspectionId} Not found`)
    }
    return existinginspection
  }

  async updateinspection(InspectionId: string, updateInspectionDto: UpdateInspectionDto) {
    const existinginspection=await this.InspectionModel.findByIdAndUpdate(InspectionId,updateInspectionDto)
    if(!existinginspection){
      throw new NotFoundException(`inspection with Id ${InspectionId} Not found`)
    }
    return existinginspection
  }

  async removeinspection(InspectionId: string) {
    const deletedinspection=await this.InspectionModel.findByIdAndRemove(InspectionId)
    if(!deletedinspection){
      throw new NotFoundException(`Inspection with Id ${InspectionId} Not found`)
    }
    return deletedinspection
  }
}
