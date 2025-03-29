import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule,ConfigService } from '@nestjs/config';


@Module({
    imports:[
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:async (configService:ConfigService) => {
                const uri = configService.get<string>('MONGODB_URI')
                return {
                    uri
                }
            },
            inject:[ConfigService],
        })
    ],
    providers:[],
    exports:[MongooseModule]
})

export class DatabaseModule {}