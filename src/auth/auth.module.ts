import { UserModule } from './../user/user.module';
import { UserService } from 'src/user/user.service';
import { userSchema } from 'src/user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { AccessTokenStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[UserModule,PassportModule,JwtModule.register({
    secret: 'pfe',
    signOptions: { expiresIn: '60s' },
  }),
  MongooseModule.forFeature([{name:'user',schema:userSchema}])],
 
  controllers: [AuthController],
  providers: [AuthService,JwtService,UserService,RefreshTokenStrategy,AccessTokenStrategy,LocalStrategy]
})
export class AuthModule {}
