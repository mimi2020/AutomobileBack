import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Category } from "src/categories/entities/category.entity";
 
@Schema({timestamps:true})

export class Voiture {
    @Prop({required:true})
    Marque:string;
    @Prop({required:true})
    Kilometrage:string;
    @Prop({required:true})
    Governorat:string;
    @Prop({required:true})
    Annee:string;
    @Prop({required:true})
    Adresse:string;
    @Prop({required:true})
    Description:string;
    @Prop({required:true})
    Photo:string;
    @Prop({required:true})
    Energie:string;
    @Prop({required:true})
    Tel:number;
    @Prop({required:true})
    Puissance_fiscal:string;
    @Prop({required:true})
    Boite:string;
    @Prop({required:true})
    Couleur:string;
    @Prop({type:SchemaTypes.ObjectId, ref:'Category'})
    ID_category:Category
    
}
export const VoitureSchema= SchemaFactory.createForClass(Voiture)
