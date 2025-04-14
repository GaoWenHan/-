import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UserModule } from '../database/models/user.module';
import { ArticleAModule } from '../database/models/articleA.module';
import { ArticleBModule } from '../database/models/articleB.module';


@Module({
    imports:[
        UserModule,
        ArticleAModule,
        ArticleBModule,
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:(configService:ConfigService)=>{
                const uri = configService.get<string>('MONGODB_URI')
                return {
                    uri,
                }
            },
            inject:[ConfigService]
        })
    ],
    exports:[MongooseModule]
})

export class DatabseModule {};