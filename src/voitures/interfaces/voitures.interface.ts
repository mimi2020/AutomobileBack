import { Document } from "mongoose";

export interface IVoiture extends Document{
    readonly Marque: string ;
    readonly Kilometrage: string ;
    readonly Governorat: string ;
    readonly Adresse: string ;
    readonly Annee: string ;
    readonly Tel: number ;
    readonly Description: string ;
    readonly Photo: string ;
    readonly Puissance_fiscal: string ;
    readonly Energie: string ;
    readonly Boite: string ;
    readonly Couleur: string ;
    readonly ID_category: string ;
}
