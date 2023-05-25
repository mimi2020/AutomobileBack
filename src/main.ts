import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config=new  DocumentBuilder()
  .setTitle('project')
  .setDescription('Nest Api')
  .addTag('auth')
  .addTag('user')
  .addTag('admin')
  .addTag('customers')
  .addTag('vendeur')
  .addTag('categories')
  .addTag('voitures')
  .addTag('commandes')
  .addTag('inspection')
  .addBearerAuth({
    description:'texte',
    name:'Authorization',
    bearerFormat:'bearer',
    type:'http',
    in:'Header'
  },'access-token')
  .build()
  const document= SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document)

  await app.listen(3000);
}
bootstrap();
