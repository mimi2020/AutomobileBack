import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateAdminDto  {
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsNumber()
    @IsNotEmpty()
    Permission:number;
}
