import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { ShopModule } from './models/shop.module';

@Module({
    imports:[
        ShopModule,
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:(configService:ConfigService)=>{
                const uri = configService.get<string>('MONGODB_URI');
                return {
                    uri,
                }
            },
            inject:[ConfigService],
        })
    ],
    exports:[MongooseModule]
})

export class DatabaseModule {
    
}