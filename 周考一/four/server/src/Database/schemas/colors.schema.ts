import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'


@Schema()
export class Colors extends Document {
    @Prop()
    Colors:string
}

export const ColorsSchema = SchemaFactory.createForClass(Colors);