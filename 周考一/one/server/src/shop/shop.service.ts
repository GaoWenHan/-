import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from '../../database/mongoose/schemas/shop.schema';


@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Shop') private shopModel:Model<Shop>
  ){}
  async getShopList(){
    try {
      const shopList = await this.shopModel.find();
      return shopList;
    } catch (error) {
      return error
    }
  }
}
