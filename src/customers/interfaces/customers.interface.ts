import { Document } from "mongoose";

export interface ICustomer extends Document{
    readonly adresse: string ;
    readonly Tel: string ;
 
}