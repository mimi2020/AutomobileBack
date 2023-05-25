import { ICustomer } from './interfaces/customers.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('customers')
    private CustomersModel:Model<ICustomer>
  ){}
  
  async createCustomer(createCustomerDto: CreateCustomerDto):Promise<ICustomer> {
    const newCustomer=new this.CustomersModel(createCustomerDto)
    return newCustomer.save()
  }

  async findAllCustomer():Promise<ICustomer[]> {
    const CustomersData= await this.CustomersModel.find()
    if (!CustomersData || CustomersData.length==0){
      throw new NotFoundException("Customers not found")
    }
    return CustomersData 
  }

  async findOneCustomer(CustomerId: string):Promise<ICustomer> {
    const existingcustomer=await this.CustomersModel.findById(CustomerId)
    if(!existingcustomer){
      throw new NotFoundException(`Customer with Id ${CustomerId} Not found`)
    }
    return existingcustomer
  }

  async updateCustomer(CustomerId: string, updateCustomerDto: UpdateCustomerDto) {
    const existingcustomer=await this.CustomersModel.findByIdAndUpdate(CustomerId,updateCustomerDto)
    if(!existingcustomer){
      throw new NotFoundException(`Customer with Id ${CustomerId} Not found`)
    }
    return existingcustomer
  }

  async removeCustomer(CustomerId: string) {
    const deletedcustomer=await this.CustomersModel.findByIdAndRemove(CustomerId)
    if(!deletedcustomer){
      throw new NotFoundException(`Customer with Id ${CustomerId} Not found`)
    }
    return deletedcustomer
  }
}
