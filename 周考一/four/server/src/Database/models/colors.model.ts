import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorsSchema } from '../schemas/colors.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'Colors',
                schema:ColorsSchema
            }
        ])
    ],
    exports:[MongooseModule]
})

export class ColorsModel {}