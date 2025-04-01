import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../database/mongoose/schemas/user.schema'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel:Model<User>
  ){}
  async LoginAPI(username:string,password:string){
    const user = await this.userModel.findOne({username})
    if(!user){
      throw new UnauthorizedException('用户名或者密码错误')
    }
    if(user.password !== password){
      throw new UnauthorizedException('用户名或者密码错误')
    }
    const token = await this.generateToken(user)
    return {
      _id:user._id,
      username:user.username,
      token
    };
  }
  private generateToken(user:User){
    const secretKey = '88889999'
    const payload = {
      _id:user._id,
      username:user.username
    }
    const options = {
      expiresIn:'1h'
    };
    return jwt.sign(payload,secretKey,options)
  }
}
