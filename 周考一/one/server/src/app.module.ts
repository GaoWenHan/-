import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './shop/shop.module';
import { DatabaseModule } from '../database/database.module';
import { ShopModel } from '../database/mongoose/models/shop.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ShopModel,
    ShopModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
