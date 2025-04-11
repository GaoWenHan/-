import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../database/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
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
}
