import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsEmail ()
    @IsString()
    @IsNotEmpty()
    email:string;
    
    @ApiProperty({
        type:String
        
    })
    @IsString()
    @IsNotEmpty()
    photo:string;
    
    
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    password:string;

    refreshtoken:string;  
    
    @IsString()
    @IsNotEmpty()
    items:string;
}
