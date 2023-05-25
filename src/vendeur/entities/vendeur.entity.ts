import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './../../user/entities/user.entity';

import { HydratedDocument } from "mongoose";
export type DeliveryDocument =HydratedDocument<Vendeur>

@Schema({timestamps:true})

export class Vendeur    {
    @Prop({required:true})
    Vendeur_proprietere:boolean
}
export const VendeurSchema= SchemaFactory.createForClass(Vendeur)


