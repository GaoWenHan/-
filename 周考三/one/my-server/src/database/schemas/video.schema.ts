import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
    @Prop()
    title: string;
    @Prop()
    imgUri: string;
    @Prop()
    cateId: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);