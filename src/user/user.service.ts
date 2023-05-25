import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  
  constructor(
    @InjectModel('user')
    private UserModel:Model<IUser>,
    private mailerService: MailerService
  ){}

  async createUser(createUserDto: CreateUserDto):Promise<IUser> {
    const newUser=await new this.UserModel(createUserDto)
    return newUser.save()
    }

  async findAllUser():Promise<IUser[]> {
    const UsersData= await this.UserModel.find().exec()
    if (!UsersData || UsersData.length==0){
      throw new NotFoundException("users not found")
    }
    return UsersData
  }
  async findAllUserByitem(items:string):Promise<IUser[]> {
    const UsersData= await this.UserModel.find({items:items}).exec()
    if (!UsersData || UsersData.length==0){
      throw new NotFoundException("users not found")
    }
    return UsersData
  }

  // async findOneUser(UserId: String):Promise<IUser>  {
  //   const existinguser=await this.UserModel.findById(UserId)
  //   if(!existinguser){
  //     throw new NotFoundException(`User with Id ${UserId} Not found`)
  //   }
  //   return existinguser
  // }
  async findOne(id: string): Promise<IUser> {
    //return `This action returns a #${id} user`;
    console.log("id on back is", id)
    return this.UserModel.findOne({_id: id }).select('-__v')
    // .populate("ListOfLeaves",'',this.leavesModel)
    // .populate("Task",'',this.TaskModel)

    .exec()
  }

  async updateUser(UserId: String, updateUserDto: UpdateUserDto) {
    const existinguser=await this.UserModel.findByIdAndUpdate(UserId,updateUserDto)
    if(!existinguser){
      throw new NotFoundException(`User with Id ${UserId} Not found`)
    }
    return existinguser
  }

  async removeUser(UserId: string) {
    const deleteduser=await this.UserModel.findByIdAndRemove(UserId)
    if(!deleteduser){
      throw new NotFoundException(`User with Id ${UserId} Not found`)
    }
    return deleteduser
  }
  async update2(id:string,updateUserDto:UpdateUserDto):Promise<IUser>{
    console.log("id in userservice is:",id);
    console.log("updateUserDto is:",updateUserDto);
    return this.UserModel
    .findByIdAndUpdate({_id:id},updateUserDto,{new:true})
  }

  async getuserbyemail(email:String):Promise<IUser>{
    const existinguser=await this.UserModel.findOne({email:email}).exec()
    if(!existinguser){
      throw new NotFoundException('user email not found')
    }
    return existinguser
  }
  async sendUserConfirmation(user: any, token: string) {
    const url = `index2.html/auth/confirm?token=${token}`;
   // const url=`index2.html`
      console.log("*****URL*****",url)
     // console.log("*****mailerService*****",mailerService)
      await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: { // :crayon2: filling curly brackets with content
          name: user.name,
          url,
        },
      });
    }
}
