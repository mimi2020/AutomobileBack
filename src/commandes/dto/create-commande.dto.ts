import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { User } from "src/user/entities/user.entity"
import { Voiture } from "src/voitures/entities/voiture.entity"

export class CreateCommandeDto {
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsArray()
    @IsNotEmpty()
    ListOfVoitures: String[] 
    
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    client: String
}
