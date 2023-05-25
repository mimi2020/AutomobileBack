import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import {Inspection} from '../entities/inspection.entity';

export class CreateInspectionDto {
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsEnum(Inspection)
    @IsNotEmpty()
    feux: string

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsEnum(Inspection)
    @IsNotEmpty()
    Consommables_avant: string

    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsEnum(Inspection)
    @IsNotEmpty()
    Freinage: string
}
