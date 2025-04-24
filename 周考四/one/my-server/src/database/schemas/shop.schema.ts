import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Shop extends Document {
    @Prop()
    shopName: string;
    @Prop()
    shopImg: string;
    @Prop()
    shopPrice: number;
    @Prop()
    shopBrand:string;
    @Prop()
    shopMemory:string;
    @Prop()
    ScreenSize:string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);