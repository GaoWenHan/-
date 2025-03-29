import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CommonResponseDto } from '../../common/CommonResponseDto'

class ShopListQueryDto {
  page: number;
  pageSize: number;
  cate: string
}

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }
  @Get('shopList')
  async SendShopList(@Query() query: ShopListQueryDto) {
    try {
      const { page, pageSize, cate } = query;
      const userList = await this.shopService.getShopList(page, pageSize, cate);
      return new CommonResponseDto(200, '获取成功', userList)
    } catch (error) {
      throw error
    }
  }
}
