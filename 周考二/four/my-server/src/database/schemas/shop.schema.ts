import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Shop extends Document {
    @Prop()
    shopName:string;
    @Prop()
    shopImg:string;
    @Prop()
    shopPrice:number;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);