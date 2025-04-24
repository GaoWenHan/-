import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from '../database/schemas/shop.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<Shop>,
  ){}
  async getShopList(){
    try {
      let result = await this.shopModel.find();
      return result;
    } catch (error) {
      return error;
    }
  }
}
