import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNotEmpty, IsArray } from "class-validator";


export class CreateCategoryDto {
    @ApiProperty({
        type:String,
        description:'this is a required and unique property'
    })
    
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @ApiProperty({
        type:String,
        description:'this is a required property'
    })

    @IsString()
    @IsNotEmpty()
    description:string


    @ApiProperty({
        type:String,
    })
    ListOfVoitures: String[] 
}
