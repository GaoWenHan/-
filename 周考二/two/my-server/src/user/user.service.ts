import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../database/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Profile } from '../database/schemas/profile.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private ProfileModel:Model<Profile>,
    private readonly jwtService: JwtService
  ) {
  }

  // 根据校验成功的登陆信息生成token
  private generateToken(user) {
    const payload = { sub: user._id, username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      token
    }
  }

  // 对登录接口信息进行解析查询
  async ValidateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).select('password');
    if (user && user.password === password) {
        return user;
    }
    return null;
  }

  // 根据解析到的信息进行验证，生成token
  async login(createUserDto: CreateUserDto) {
    const user = await this.ValidateUser(createUserDto.username, createUserDto.password);
    if (!user) {
      return new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const newUser = new this.userModel({
      username,
      password
    });
    const savedUser = await newUser.save();
    return this.generateToken(savedUser);
  }


  async getProfileText(){
    try {
      let result = await this.ProfileModel.find();
      return {
        result
      }
    } catch (error) {
      return error;
    }
  }

  async updateName(_id,name){
    try {
      let result = await this.ProfileModel.findByIdAndUpdate({_id:_id},{$set:{name:name}})
      return {
        result
      }
    } catch (error) {
      return error;
    }
  }

  async updateSex(_id,sex){
    try {
      await this.ProfileModel.findByIdAndUpdate({_id:_id},{$set:{sex:sex}})
      return;
    } catch (error) {
      return error;
    }
  }

  async updateBirthday(_id,birthDate){
    try {
      console.log(_id,birthDate);
      
      await this.ProfileModel.findByIdAndUpdate(
        _id,
        {$set:{birthday:birthDate}},
        {new:true}
      );
      
      return;
    } catch (error) {
      return error;
    }
  }
}
