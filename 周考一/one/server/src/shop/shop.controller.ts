import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CommonResponseDto } from '../../common/CommonResponseDto'

class ShopListQueryDto {
  page: number;
  pageSize: number;
}

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }
  @Get('shopList')
  async SendShopList(@Query() query: ShopListQueryDto) {
    try {
      const { page, pageSize } = query;
      const userList = await this.shopService.getShopList(page, pageSize);
      return new CommonResponseDto(200, '获取成功', userList)
    } catch (error) {
      throw error
    }
  }
}
