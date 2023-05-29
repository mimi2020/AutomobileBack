import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { UserModule } from './user/user.module';
import { VoituresModule } from './voitures/voitures.module';
import { CommandesModule } from './commandes/commandes.module';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { InspectionModule } from './inspection/inspection.module';
import { VendeurModule } from './vendeur/vendeur.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017", {dbname:"nestdb"}),
            ConfigModule.forRoot(),
            CategoriesModule,
           
            UserModule,
            VoituresModule,
            CommandesModule,
            CustomersModule,
            AdminModule,
            InspectionModule,
            VendeurModule,
            AuthModule,
            MailerModule.forRoot({
              transport : {
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "f720852db82555",
                pass: "b2015e100f75e4"
              }
            },
            defaults: {
              from: '"No Reply" <noreply@example.com>',
            },
            template: {
              dir: join(__dirname, 'templates'),
              adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
              options: {
                strict: true,
              },
            },

          }),
            
          ],
           
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
