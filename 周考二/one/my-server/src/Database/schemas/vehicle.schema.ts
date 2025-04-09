import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

@Schema()
export class Vehicle extends Document {
    @Prop()
    name:string
    @Prop({type:Types.ObjectId,ref:'Brand'})
    brandId:Types.ObjectId;
}
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);