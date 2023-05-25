import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class CreateVoitureDto {
    @ApiProperty({
        type: String,
        description: 'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Marque: string;

    @ApiProperty({
        type: String,
        description: 'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Kilometrage: string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Governorat:string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Annee:string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Adresse:string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Description:string;

    @ApiProperty({
        type: String,
        description: 'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Photo: string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Energie:string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsNumber()
    @IsNotEmpty()
    Tel:number;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Puissance_fiscal:string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Boite:string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Couleur:string;

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    ID_category:string;

}
