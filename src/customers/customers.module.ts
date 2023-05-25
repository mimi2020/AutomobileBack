import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './entities/customer.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'customers',schema:CustomerSchema}])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
