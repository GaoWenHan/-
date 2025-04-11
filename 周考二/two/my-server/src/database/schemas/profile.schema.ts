import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
    @Prop()
    name:string
    @Prop()
    sex:string
    @Prop()
    birthday:string
    @Prop()
    city:string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);