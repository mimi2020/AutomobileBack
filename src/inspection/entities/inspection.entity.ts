import { Voiture } from './../../voitures/entities/voiture.entity';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes } from "mongoose";

enum InspectionType {
    Bon_fonctionnement=1,
    Mal_fonctionnement=2 ,
    Non_fonctionnement=3 
}
@Schema({ timestamps: true })
export class Inspection {

    @Prop({ type: SchemaTypes.ObjectId, ref: 'voiture' })
    ListOfVoitures: Voiture;

    @Prop({type:String,enum:InspectionType})
    feux: string;
    // Feux: {
       
    //         type:String
    //         enum: ['Non_fonctionement', 'Mal-fonctionement', 'Bon-fonctionement'],
    //     default: 'Bon-fonctionement'
    // }
    @Prop({type:String,enum:InspectionType})
    Consommables_avant: string
    // Consommables_avant: {
    //     type: String,
    //     enum: ['Non_fonctionement', 'Mal-fonctionement', 'Bon-fonctionement'],
    //     default: 'Bon-fonctionement'
    // }
    @Prop({type:String,enum:InspectionType})
    Freinage: string;
    // Freinage: {
    //     type: String,
    //     enum: ['Non_fonctionement', 'Mal-fonctionement', 'Bon-fonctionement'],
    //     default: 'Bon-fonctionement'
    // }
}
export const InspectionSchema = SchemaFactory.createForClass(Inspection)
