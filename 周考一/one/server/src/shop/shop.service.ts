import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from '../../database/mongoose/schemas/shop.schema';
import { CustomException } from '../../common/exceptions/custom-exception'


@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Shop') private shopModel: Model<Shop>
  ) { }
  async getShopList(page: number, pageSize: number, cate: string) {
    try {
      console.log(page,pageSize,cate);
      const skip = (page - 1) * pageSize;
      let query = {};
      if (cate) {
        query = { cate };
      }
      const shopList = await this.shopModel.find(query).skip(skip).limit(pageSize);
      return shopList;
    } catch (error) {
      throw new CustomException('获取数据失败', 500)
    }
  }
}
