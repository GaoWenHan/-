import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UserModule } from '../database/models/user.module';


@Module({
    imports:[
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:async (configService:ConfigService) => {
                const uri = configService.get<string>("MONGODB_URI")
                return {
                    uri
                }
            },
            inject:[ConfigService]
        }),
        UserModule
    ],
    exports:[MongooseModule]
})

export class DatabaseModel {}