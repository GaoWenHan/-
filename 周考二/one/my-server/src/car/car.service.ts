import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../Database/schemas/brand.schema';
import { Vehicle } from '../Database/schemas/vehicle.schema';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {

  }
  async getAllBrand() {
    try {
      const result = await this.brandModel.aggregate([
        {
          $lookup: {
            from: 'vehicles',
            let: { brandId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$$brandId', { $toObjectId: '$brandId' }]
                  }
                }
              }
            ],
            as: 'vehicles'
          }
        }
      ]);
      return { result };
    } catch (error) {
      console.error('聚合查询出错:', error);
      return;
    }
  }

  async getAllVehicle() {
    try {
      let result = await this.vehicleModel.find();
      return { result };
    } catch (error) {
      return error;
    }
  }
}
