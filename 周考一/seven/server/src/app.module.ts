import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { DatabaseModule } from './database/database.module'
import { UserModel } from './database/mongoose/models/user.module'
import { ConfigModule } from '@nestjs/config';
import { ShopModel } from './database/mongoose/models/shop.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DatabaseModule,
    UserModel,
    UserModule,
    ShopModel,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
