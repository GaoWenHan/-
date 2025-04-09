import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from '../schemas/brand.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:'Brand',
            schema:BrandSchema
        }])
    ],
    exports:[MongooseModule]
})

export class BrandModule {}