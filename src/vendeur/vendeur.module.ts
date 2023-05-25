import { Module } from '@nestjs/common';
import { VendeurService } from './vendeur.service';
import { VendeurController } from './vendeur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendeurSchema } from './entities/vendeur.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'vendeur',schema:VendeurSchema}])],
  controllers: [VendeurController],
  providers: [VendeurService]
})
export class VendeurModule {}
