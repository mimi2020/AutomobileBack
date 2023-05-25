import { User } from './../../user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Voiture } from "src/voitures/entities/voiture.entity";

@Schema({timestamps:true})

export class Commande {
    @Prop([{type:SchemaTypes.ObjectId, ref:'voiture' }])
    ListOfVoitures:Voiture;
    @Prop({type:SchemaTypes.ObjectId, ref:'user' })
    
    client:String;
}
export const CommandeSchema= SchemaFactory.createForClass(Commande)
