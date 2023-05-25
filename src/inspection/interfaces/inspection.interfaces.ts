import { Document } from "mongoose";


export interface IInspection extends Document{
    readonly Feux: string ;
    readonly Consommables_avant: string ;
    readonly Freinage: string ;
      
}
