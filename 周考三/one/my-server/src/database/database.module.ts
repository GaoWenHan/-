import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { VideoModule } from '../database/models/video.model';

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal:true,
            envFilePath:'.env'
        }),
        VideoModule,
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:async (configService:ConfigService)=>{
                const uri = configService.get<string>('MONGODB_URI')
                return {
                    uri,
                }
            },
            inject:[ConfigService]
        })
    ],
    providers:[],
    exports:[MongooseModule]
})

export class DatabaseModule {
    
}