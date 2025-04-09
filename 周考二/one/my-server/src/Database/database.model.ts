import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BrandModule } from './models/brand.model';
import { VehicleModule } from './models/vehicle.model';
import { CarModule } from './models/car.model';


@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const uri = configService.get<string>('MONGODB_URI');
                return {
                    uri
                }
            },
            inject: [ConfigService]
        }),
        BrandModule,
        VehicleModule,
        CarModule
    ],
    providers: [],
    exports: [MongooseModule]
})

export class DatabaseModule { }