import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from '../schemas/profile.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:'Profile',
            schema:ProfileSchema
        }])
    ],
    exports:[MongooseModule]
})

export class ProfileModule {}