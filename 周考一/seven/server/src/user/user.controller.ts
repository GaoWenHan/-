import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './Dto/login.dto';
import { CommonResponseDto } from '../common/CommonResponseDto/CommonResponseDto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Body() loginDto:LoginDto){
    const { username,password } = loginDto;
    let userInfo =  await this.userService.LoginAPI(username,password)
    return new CommonResponseDto(200,'登录成功',userInfo)
  }
 
}
