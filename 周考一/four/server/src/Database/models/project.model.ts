import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../schemas/project.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{
           name:'Project',
           schema:ProjectSchema
        }])
    ],
    exports:[MongooseModule]
})

export class ProjectModel {}