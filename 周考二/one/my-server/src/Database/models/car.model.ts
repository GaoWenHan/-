import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from '../schemas/car.schema';


@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'Car',
                schema:CarSchema
            }
        ])
    ],
    exports:[MongooseModule]
})

export class CarModule {}