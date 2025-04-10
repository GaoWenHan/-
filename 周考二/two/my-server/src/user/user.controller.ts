import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonResponseDto } from '../common/CommonResponseDto/CommonResponseDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('login')
  async GoLogin(@Body() createUserDto: CreateUserDto) {
    try {
      let result = await this.userService.login(createUserDto);
      return new CommonResponseDto(200, '登录成功', result)
    } catch (error) {
      return new CommonResponseDto(error.getStatus ? error.getStatus() : 500, error.message)
    }
  }
  @Post('register')
  async GoRegister(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.register(createUserDto);
      return new CommonResponseDto(200, '注册成功')
    } catch (error) {
      return error
    }
  }
}
