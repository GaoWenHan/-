import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleASchema } from '../schemas/articleA.schema'


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: 'ArticleA',
            schema: ArticleASchema
        }])
    ],
    exports:[MongooseModule]
})

export class ArticleAModule {
    
}