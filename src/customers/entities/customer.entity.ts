import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './../../user/entities/user.entity';

import { HydratedDocument } from "mongoose";
export type DeliveryDocument =HydratedDocument<Customer>

@Schema({timestamps:true})


export class Customer  {
    @Prop({required:true})
    adresse:string;
    @Prop({required:true})
    Tel:string;
}
export const CustomerSchema= SchemaFactory.createForClass(Customer)
