import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateloginDto } from './dto/create-login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import {AccessTokenGuard} from "../auth/common/guards/accesToken.guards"

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  userService:UserService
  constructor(private readonly authService: AuthService) {}

  @ApiBody({schema:{
    properties:{
      'email':{type:'string'},
      'password':{type:'string'}
    }
  }})

   @UseGuards(AuthGuard('local'))
  //@UseGuards(AccessTokenGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log('the result;', req.user);
    return this.authService.login(req.user);
  }




  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  async logout(@Request() req) {
    console.log("req.user in auth controller",req.user.sub)

    await this.authService.logout(req.user['sub']);
  
  }
//   @Get()
//   findAll() {
//     return this.authService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.authService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
}
