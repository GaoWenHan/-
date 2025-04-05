import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

@Schema()
export class Item extends Document {
    @Prop()
    ItemName:string
    @Prop({type:Types.ObjectId,ref:'List'})
    ItId:Types.ObjectId
    @Prop({default:false})
    status:boolean
}

export const ItemSchema = SchemaFactory.createForClass(Item);