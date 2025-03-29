import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CommonResponseDto } from '../../common/CommonResponseDto'


@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  @Get('shopList')
  async SendShopList(){
    try {
      const userList = await this.shopService.getShopList();
      return new CommonResponseDto(200,'获取成功',userList)
    } catch (error) {
      throw error
    }
  }
}
