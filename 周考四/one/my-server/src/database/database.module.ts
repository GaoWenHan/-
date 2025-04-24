import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ShopModule } from '../database/models/shop.model';

@Module({
    imports: [
        ShopModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const uri = configService.get<string>('MONGO_URI');
                return {
                    uri,
                }
            },
            inject: [ConfigService]
        })
    ],
    providers: [],
    exports: [MongooseModule]
})

export class DatabaseModule { }