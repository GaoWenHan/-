import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';


@Schema()
export class ArticleB extends Document {
    @Prop()
    title:string
    @Prop()
    content:string
    @Prop({type:Types.ObjectId,ref:'ArticleA'})
    articleAId:Types.ObjectId
}

export const ArticleBSchema = SchemaFactory.createForClass(ArticleB)