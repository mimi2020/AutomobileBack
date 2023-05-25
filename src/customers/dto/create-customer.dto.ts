import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export class CreateCustomerDto{
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    adresse:string;
    
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsString()
    @IsNotEmpty()
    Tel:string;

    
}
