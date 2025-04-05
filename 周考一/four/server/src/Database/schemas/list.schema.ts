import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class List extends Document {
    @Prop()
    ListName:string
    @Prop({type:Types.ObjectId,ref:'Project'})
    LId:Types.ObjectId
}

export const ListSchema = SchemaFactory.createForClass(List);