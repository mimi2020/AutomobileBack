import { Prop,SchemaFactory,Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Voiture } from "src/voitures/entities/voiture.entity";

@Schema({timestamps:true})

export class Category {
    @Prop({required:true,unique:true})
    name:string;
    @Prop({required:true})
    description:string;
    @Prop([{type:SchemaTypes.ObjectId, ref:'voiture' }])
    ListOfVoitures:[Voiture];
}

export const categorySchema= SchemaFactory.createForClass(Category)
