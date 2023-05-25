import { Document } from "mongoose";

export interface IVendeur extends Document{
    readonly  Vendeur_proprietere: boolean ;
    readonly name: string ;
    readonly email: string ;
    readonly photo: string ;
    
    readonly password: string ;
}
