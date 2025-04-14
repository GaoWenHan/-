import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'; 
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    DatabseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
