import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UserModule } from '../database/models/user.module';
import { ProfileModule } from '../database/models/profile.module';


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
        UserModule,
        ProfileModule
    ],
    exports:[MongooseModule]
})

export class DatabaseModel {}