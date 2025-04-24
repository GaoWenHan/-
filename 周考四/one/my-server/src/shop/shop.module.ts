import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopModule as ShopList } from '../database/models/shop.model';

@Module({
  imports:[ShopList],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
