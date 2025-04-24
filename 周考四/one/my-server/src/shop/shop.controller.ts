import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CommonResponseDto } from '../common/CommonResponseDto/CommonResponseDto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('list')
  async getShopList() {
    try {
      let result = await this.shopService.getShopList();
      return new CommonResponseDto(200, '获取成功', result);
    } catch (error) {
      return new CommonResponseDto(null, '获取失败', 500);
    }
  }
}
