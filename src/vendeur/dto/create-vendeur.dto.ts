
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export class CreateVendeurDto  {
    @ApiProperty({
        type:String,
        description:'this is a required '
    })
    @IsBoolean()
    @IsNotEmpty()
    Vendeur_proprietere:boolean;
    
}
