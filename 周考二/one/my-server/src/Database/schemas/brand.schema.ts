import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
    @Prop()
    name:string
    @Prop()
    cate:string
}
export const BrandSchema = SchemaFactory.createForClass(Brand);