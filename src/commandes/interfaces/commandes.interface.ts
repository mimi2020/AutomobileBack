import { Document } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { Voiture } from "src/voitures/entities/voiture.entity";

export interface ICommande extends Document{
    readonly ListOfVoitures: [String] ;
    readonly client: String ;
      
}