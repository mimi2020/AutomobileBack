import { UserService } from 'src/user/user.service';
import { CreateloginDto } from './dto/create-login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtSerivce: JwtService) {
    }
  create(createloginDto: CreateloginDto) {
    return 'This action adds a new auth';
  }
 
  async login(user:any){
    const refreshToken=this.jwtSerivce.sign(
      {
        sub:user._id,
        email:user.email
      },
      {
        secret:"pfe",
      expiresIn:'7d',
      },
    )
    await this.updateRefreshToken(user._id,refreshToken);
    return{
      access_token:this.jwtSerivce.sign(
        {
          sub:user._id,
          email:user.email
        },
        {
          secret:"pfe",
          expiresIn:'15m',
        },
      ),
      refreshToken:refreshToken,
      items:user.items
    }
  }
  async validateUser(email:string,password:string):Promise<any>{
    console.log('%cusers.service.ts line:56:email','color:#007acc;',email);
    const user=await this.userService.getuserbyemail(email);
    if(!user)return null;

    const passwordValid=await argon2.verify(user.password,password)
    if(!user){
        throw new NotFoundException('could not found user')
    }
    if(user&&passwordValid){
        return user
    }
    return null
 
  }

  async updateRefreshToken(userId:string,refreshtoken:string){
    const hashedRefreshToken=await this.hashData(refreshtoken)
    await this.userService.update2(userId,{
        refreshtoken: hashedRefreshToken,
    });
  }
  hashData(data:string){
    return argon2.hash(data);
  }
  async logout(userId:string){
    console.log("userId is:",userId)
    const refreshtoken=null;
    console.log("test",refreshtoken)
    return this.userService.update2(userId,refreshtoken)
  }
}
