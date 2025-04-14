import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleBSchema } from '../schemas/articleB.schema'


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: 'ArticleB',
            schema: ArticleBSchema
        }])
    ],
    exports:[MongooseModule]
})

export class ArticleBModule {
    
}