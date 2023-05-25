import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { AccessTokenGuard } from 'src/auth/common/guards/accesToken.guards';

@Controller('commandes')
@ApiTags('commandes')

export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Post()
  async createCommandes(@Res()response, @Body() createCommandeDto: CreateCommandeDto) {
  //  try{
  //     const newCommandes=await this.commandesService.createCommandes(createCommandeDto)
  //     console.log(newCommandes)
  //     return response.status(HttpStatus.CREATED).json({
  //      message:'commandes has been created succesfully',
  //      status:HttpStatus.CREATED,
  //      data:newCommandes
  //     })
  //   }catch(error){
  //    return response.status(HttpStatus.BAD_REQUEST).json({
  //      message:error.message,
  //      status:HttpStatus.BAD_REQUEST,
  //      data:null
  //    })
  //   }
     return await this.commandesService.createCommandes(createCommandeDto)
  }

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Get()
  async findAllCommandes(@Res()response) {
    try{
      const CommandesData= await this.commandesService.findAllCommandes()
      return response.status(HttpStatus.OK).json({
        message:'all commandes data found successfully',
        status:HttpStatus.OK,
        data:CommandesData
      })

    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a commande that exists in database",
    type:String
  })
  async findOneCommande(@Res()response, @Param('id') CommandeId: string) {
    try{
      const existingcommande= await this.commandesService.findOneCommande(CommandeId)
      return response.status(HttpStatus.OK).json({
        message:'commande found by id',
        status:HttpStatus.OK,
        data:existingcommande
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'commande id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a commande that exists in database",
    type:String
  })
  async updateCommande(@Res()response, @Param('id') CommandeId: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    try{
      const existingcommande= await this.commandesService.updateCommande(CommandeId,updateCommandeDto)
      return response.status(HttpStatus.OK).json({
        message:'Commande updated by id',
        status:HttpStatus.OK,
        data:existingcommande
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Commande id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  
  // @ApiBearerAuth('access-token')
  // @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a commande that exists in database",
    type:String
  })
  async removeCommande(@Res()response,@Param('id') CommandeId: string) {
    try{
      const deletedcommande= await this.commandesService.removeCommande(CommandeId)
      return response.status(HttpStatus.OK).json({
        message:'Commande deleted by id',
        status:HttpStatus.OK,
        data:deletedcommande
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Commande id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
