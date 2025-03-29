import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Shop extends Document {
    @Prop()
    shopName:string
    @Prop()
    price:number
    @Prop()
    imgUrl:string
    @Prop()
    cate:string
}

export const ShopSchema = SchemaFactory.createForClass(Shop);