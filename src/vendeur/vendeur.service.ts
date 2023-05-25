import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVendeurDto } from './dto/create-vendeur.dto';
import { UpdateVendeurDto } from './dto/update-vendeur.dto';
import { IVendeur } from './interfaces/Vendeur.interface';

@Injectable()
export class VendeurService {
  constructor(
    @InjectModel('vendeur')
    private VendeurModel:Model<IVendeur>
  ){}
  
  async createVendeur(createVendeurDto: CreateVendeurDto):Promise<IVendeur> {
    const newVendeur=new this.VendeurModel(createVendeurDto)
    return newVendeur.save()
  }

  async findAllVendeur():Promise<IVendeur[]> {
    const VendeurData= await this.VendeurModel.find()
    if (!VendeurData || VendeurData.length==0){
      throw new NotFoundException("Vendeurs not found")
    }
    return VendeurData 
  }

  async findOneVendeur(VendeurId: string):Promise<IVendeur> {
    const existingvendeur=await this.VendeurModel.findById(VendeurId)
    if(!existingvendeur){
      throw new NotFoundException(`vendeur with Id ${VendeurId} Not found`)
    }
    return existingvendeur
  }

  async updateVendeur(VendeurId: string, updateVendeurDto: UpdateVendeurDto) {
    const existingvendeur=await this.VendeurModel.findByIdAndUpdate(VendeurId,updateVendeurDto)
    if(!existingvendeur){
      throw new NotFoundException(`vendeur with Id ${VendeurId} Not found`)
    }
    return existingvendeur
  }

  async removeVendeur(VendeurId: string) {
    const deletedvendeur=await this.VendeurModel.findByIdAndRemove(VendeurId)
    if(!deletedvendeur){
      throw new NotFoundException(`vendeur with Id ${VendeurId} Not found`)
    }
    return deletedvendeur
  }
}
