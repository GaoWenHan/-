import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModel } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    DatabaseModel,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
