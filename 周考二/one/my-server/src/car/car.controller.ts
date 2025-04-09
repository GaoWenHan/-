import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CommponResponseDto  } from '../common/commonResponseDto/CommonResponse';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}
  @Get('brand')
  async getAllBrand() {
    try {
      let result = await this.carService.getAllBrand();
      return new CommponResponseDto(200, '获取品牌成功', result);
    } catch (error) {
      return error;
    }
  }
  @Get('vehicle')
  async getAllVehicle() {
    try {
      let result = await this.carService.getAllVehicle();
      return new CommponResponseDto(200, '获取车型成功', result);
    } catch (error) {
      return error;
    }
  }
}
