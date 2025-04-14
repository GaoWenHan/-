import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UserModule } from '../database/models/user.module';
import { ArticleAModule } from '../database/models/articleA.module';
import { ArticleBModule } from '../database/models/articleB.module';

@Module({
  imports: [
    UserModule,
    ArticleAModule,
    ArticleBModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions:{expiresIn:'1h'},
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
