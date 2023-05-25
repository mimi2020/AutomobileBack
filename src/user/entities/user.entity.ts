import { Prop,SchemaFactory,Schema } from "@nestjs/mongoose";
import * as argon2 from 'argon2';
import { HydratedDocument } from "mongoose";
import { Admin } from "src/admin/entities/admin.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Vendeur } from "src/vendeur/entities/vendeur.entity";
export type UserDocument = HydratedDocument<User>;


@Schema({ discriminatorKey: 'items' })

export class User {
    @Prop({ type: String, required: true, enum: [Customer.name,Vendeur.name,Admin.name]})
    items: string
    @Prop({required:true,unique:true})
    name:string;
    @Prop({required:true,unique:true})
    email:string;
    @Prop({required:true})
    photo:string;
    @Prop({required:true})
    password:string;
    @Prop()
    refreshtoken:string 
}
export const userSchema = SchemaFactory.createForClass(User).pre("save",
async function(){
this.password = await argon2.hash(this.password);
})