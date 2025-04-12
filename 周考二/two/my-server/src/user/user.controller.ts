import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  @Get('profile')
  async GetProfile() {
    try {
      let result = await this.userService.getProfileText();
      return new CommonResponseDto(200, '获取成功', result)
    } catch (error) {
      return error;
    }
  }
  @Post('upName')
  async UpName(
      @Query('_id') _id:string,
      @Query('name') name:string
    ) {
    try {
      console.log(_id,name);
      await this.userService.updateName(_id,name);
      return new CommonResponseDto(200, '修改成功')
    } catch (error) {
      return error;
    }
  }
  @Post('upSex')
  async UpSex(
    @Query('_id') _id:string,
    @Query('sex') sex:string
  ){
    try {
      await this.userService.updateSex(_id,sex);
      return new CommonResponseDto(200, '修改成功')
    } catch (error) {
      return error;
    }
  }
  @Post('uBirthday')
  async UpBirthday(
    @Query('_id') _id:string,
    @Query('birthDate') birthDate:string
  ){
    try {
      await this.userService.updateBirthday(_id,birthDate);
      return new CommonResponseDto(200, '修改成功')
    } catch (error) {
      return error;
    }
  }
}
