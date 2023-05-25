import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './interfaces/admin.interface';

@Injectable()
export class AdminService {
  
  constructor(
    @InjectModel('admin')
    private AdminModel:Model<IAdmin>
  ){}

  async createAdmin(createAdminDto: CreateAdminDto):Promise<IAdmin> {
    const newAdmin=new this.AdminModel(createAdminDto)
    return newAdmin.save()
  }

  async findAllAdmin():Promise<IAdmin[]> {
    const AdminData= await this.AdminModel.find()
    if (!AdminData || AdminData.length==0){
      throw new NotFoundException("Admin not found")
    }
    return AdminData 
  }

  async findOneAdmin(AdminId: string):Promise<IAdmin> {
    const existingadmin=await this.AdminModel.findById(AdminId)
    if(!existingadmin){
      throw new NotFoundException(`Admin with Id ${AdminId} Not found`)
    }
    return existingadmin
  }

  async updateAdmin(AdminId: string, updateAdminDto: UpdateAdminDto) {
    const existingadmin=await this.AdminModel.findByIdAndUpdate(AdminId,updateAdminDto)
    if(!existingadmin){
      throw new NotFoundException(`Admin with Id ${AdminId} Not found`)
    }
    return existingadmin
  }

  async removeAdmin(AdminId: string) {
    const deletedadmin=await this.AdminModel.findByIdAndRemove(AdminId)
    if(!deletedadmin){
      throw new NotFoundException(`Admin with Id ${AdminId} Not found`)
    }
    return deletedadmin
  
  }
}
