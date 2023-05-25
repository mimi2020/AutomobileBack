import { Voiture } from './../voitures/entities/voiture.entity';
import { ICommande } from './interfaces/commandes.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {IUser} from '../user/interfaces/user.interface';
import {IVoiture} from '../voitures/interfaces/voitures.interface';
@Injectable()
export class CommandesService {
  constructor(
    @InjectModel('commandes')
    private CommandesModel:Model<ICommande>,
    @InjectModel('voitures')
    private VoitureModel:Model<IVoiture>,
    @InjectModel('user')
    private UserModel:Model<IUser>
  ){}
  
  async createCommandes(createCommandeDto: CreateCommandeDto):Promise<ICommande> {
    console.log(createCommandeDto)
    const newCommandes= await new this.CommandesModel(createCommandeDto)
    return newCommandes.save()
  }

  async findAllCommandes():Promise<ICommande[]> {
    const CommandesData= await this.CommandesModel.find()
    .populate("ListOfVoitures", '', this.VoitureModel)
    .populate("client", '', this.UserModel)
    if (!CommandesData || CommandesData.length==0){
      throw new NotFoundException("Commandes not found")
    }
    return CommandesData
  }

  async findOneCommande(CommandeId: String): Promise<ICommande> {
    const existingcommande=await this.CommandesModel.findById(CommandeId)
    .populate("ListOfVoitures", '', this.VoitureModel)
    .populate("client", '', this.UserModel)
    if(!existingcommande){
      throw new NotFoundException(`Commandes with Id ${CommandeId} Not found`)
    }
    return existingcommande
  }

  async updateCommande(CommandeId: String, updateCommandeDto: UpdateCommandeDto) {
    const existingcommande=await this.CommandesModel.findByIdAndUpdate(CommandeId,updateCommandeDto)
    if(!existingcommande){
      throw new NotFoundException(`Commande with Id ${CommandeId} Not found`)
    }
    return existingcommande
  }

  async removeCommande(CommandeId: String) {
    const deletedcommande=await this.CommandesModel.findByIdAndRemove(CommandeId)
    if(!deletedcommande){
      throw new NotFoundException(`Commande with Id ${CommandeId} Not found`)
    }
    return deletedcommande
  }
}
