import { Module } from '@nestjs/common';
import { VoituresService } from './voitures.service';
import { VoituresController } from './voitures.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VoitureSchema } from './entities/voiture.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { categorySchema } from 'src/categories/entities/category.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'voitures',schema:VoitureSchema}]),
  MongooseModule.forFeature([{name:'categories',schema:categorySchema}])
],
  controllers: [VoituresController],
  providers: [VoituresService,CategoriesService]
})
export class VoituresModule {}
