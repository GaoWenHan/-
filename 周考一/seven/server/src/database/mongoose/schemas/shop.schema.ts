import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Shop extends Document {
    @Prop()
    shopName:string
    @Prop()
    imgUrl:string
    @Prop()
    shopPrice:Number
    @Prop()
    shopCate:string
}

export const ShopSchema = SchemaFactory.createForClass(Shop)