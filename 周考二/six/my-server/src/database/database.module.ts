import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UserModule } from '../database/models/user.module';


@Module({
    imports:[
        UserModule,
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