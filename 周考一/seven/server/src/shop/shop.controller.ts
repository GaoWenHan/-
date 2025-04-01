import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';


@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

}
