import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose'

@Schema()
export class Project extends Document {
    @Prop()
    projectName:string
    @Prop({type:Types.ObjectId,ref:'Colors'})
    colors:Types.ObjectId
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
