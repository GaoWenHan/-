import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from '../schemas/video.schema';


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: 'Video',
            schema: VideoSchema
        }])
    ],
    exports:[MongooseModule]
})

export class VideoModule {
    
}