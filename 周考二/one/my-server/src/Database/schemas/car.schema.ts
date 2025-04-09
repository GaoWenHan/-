import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';


@Schema()
export class Car extends Document {
    @Prop()
    carName:string
    @Prop()
    carImg:string
    @Prop()
    carPrice:Number
    @Prop({type:Types.ObjectId,ref:'Brand'})
    carTyId:Types.ObjectId
    @Prop({type:Types.ObjectId,ref:'Vehicle'})
    carVyId:Types.ObjectId
}

export const CarSchema = SchemaFactory.createForClass(Car);