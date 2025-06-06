import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from '../database/mongoose/schemas/user.schema'

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'User',
        schema:UserSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
