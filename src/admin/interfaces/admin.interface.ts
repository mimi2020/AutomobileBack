import { Document } from "mongoose";

export interface IAdmin extends Document{
   
    readonly permission: number ;
 
}