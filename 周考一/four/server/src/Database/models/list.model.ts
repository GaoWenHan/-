import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from '../schemas/list.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'List',
                schema:ListSchema
            }
        ])
    ],
    exports:[MongooseModule]
})

export class ListModel {}