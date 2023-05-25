import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AccessTokenGuard } from 'src/auth/common/guards/accesToken.guards';

@Controller('customers')
@ApiTags('customers')

export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}


  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        photo: {
          type: 'string',
          format: 'binary',
        },
        adresse: { type: 'string' },
        Tel: { type: 'string' },
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination:"./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  
  @Post()
  async createCustomer(@Res() response,@Body() createCustomerDto: CreateCustomerDto,@UploadedFile()file: Express.Multer.File) {
    try{
      // createCustomerDto.photo=file.filename
      const newCustomer=await this.customersService.createCustomer(createCustomerDto)
      return response.status(HttpStatus.CREATED).json({
       message:'Customer has been created succesfully',
       status:HttpStatus.CREATED,
       data:newCustomer
      })
    }catch(error){
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:error.message,
       status:HttpStatus.BAD_REQUEST,
       data:null
     })
    }
  }

  
  
  @Get()
  async findAllCustomer(@Res() response) {
    try{
      const CustomersData= await this.customersService.findAllCustomer()
      return response.status(HttpStatus.OK).json({
        message:'all customers data found successfully',
        status:HttpStatus.OK,
        data:CustomersData
      })

    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Get(':id')
  @ApiParam({
    name:'id',
    required:true,
    description:"should be an id of a customer that exists in database",
    type:String
  })
  async findOneCustomer(@Res() response,@Param('id') CustomerId: string) {
    try{
      const existingcustomer= await this.customersService.findOneCustomer(CustomerId)
      return response.status(HttpStatus.OK).json({
        message:'Customer found by id',
        status:HttpStatus.OK,
        data:existingcustomer
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Customer id not found',
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
    description:"should be an id of a customer that exists in database",
    type:String
  })
  async updateCustomer(@Res() response,@Param('id') CustomerId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    try{
      const existingcustomer= await this.customersService.updateCustomer(CustomerId,updateCustomerDto)
      return response.status(HttpStatus.OK).json({
        message:'Customer updated by id',
        status:HttpStatus.OK,
        data:existingcustomer
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Customer id not found',
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
    description:"should be an id of a customer that exists in database",
    type:String
  })
  async removeCustomer(@Res() response,@Param('id') CustomerId: string) {
    try{
      const deletedcustomer= await this.customersService.removeCustomer(CustomerId)
      return response.status(HttpStatus.OK).json({
        message:'Customer deleted by id',
        status:HttpStatus.OK,
        data:deletedcustomer
      })
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Customer id not found',
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
