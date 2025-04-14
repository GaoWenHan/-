import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ArticleA extends Document {
    @Prop()
    title: string;
}

export const ArticleASchema = SchemaFactory.createForClass(ArticleA);