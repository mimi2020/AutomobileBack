import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { CommandeSchema } from './entities/commande.entity';
import { VoitureSchema } from 'src/voitures/entities/voiture.entity';
import { userSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'commandes',schema:CommandeSchema}]),
  MongooseModule.forFeature([{name:'voitures',schema:VoitureSchema}]),
  MongooseModule.forFeature([{name:'user',schema:userSchema}]),],

  controllers: [CommandesController],
  providers: [CommandesService]
})
export class CommandesModule {}
