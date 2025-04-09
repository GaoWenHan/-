import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from '../schemas/vehicle.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:'Vehicle',
            schema:VehicleSchema
        }])
    ],
    exports:[MongooseModule]
})

export class VehicleModule{}