import { Document } from "mongoose";

export interface IUser extends Document{
    readonly name: string ;
    readonly email: string ;
    readonly photo: string ;
    
    readonly password: string ;
    refreshtoken: string ;
    items: string ;

}