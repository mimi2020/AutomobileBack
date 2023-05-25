import { Module } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { InspectionController } from './inspection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InspectionSchema } from './entities/inspection.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'inspection',schema:InspectionSchema}])],
  controllers: [InspectionController],
  providers: [InspectionService]
})
export class InspectionModule {}
