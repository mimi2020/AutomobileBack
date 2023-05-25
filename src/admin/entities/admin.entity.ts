import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";

import { HydratedDocument } from "mongoose";
export type DeliveryDocument = HydratedDocument<Admin>

@Schema({timestamps:true})

export class Admin    {
    @Prop({required:true})
    Permission:number;
}

export const AdminSchema= SchemaFactory.createForClass(Admin)
