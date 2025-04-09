import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../Database/schemas/brand.schema';
import { Vehicle } from '../Database/schemas/vehicle.schema';
import { Car } from '../Database/schemas/car.schema';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
    @InjectModel(Car.name) private carModel:Model<Car>
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

  async getAllCar(priceSort){
    try {
      console.log(priceSort);
      let query = {};
      switch(priceSort){
        case '不限':
          query = {};
          break;
        case '0-3万':
          query = { carPrice : { $gte:0 ,$lt:30000 } };
          break;
        case '3-5万':
          query = { carPrice : { $gte:30000 ,$lt:50000 } };
          break;
        case '5-10万':
          query = { carPrice : { $gte:50000 ,$lt:100000 } };
          break;
        case '10-15万':
          query = { carPrice : { $gte:100000 ,$lt:150000 } };
          break;
        case '15-20万':
          query = { carPrice : { $gte:150000 ,$lt:200000 } };
          break;
        case '20-30万':
          query = { carPrice : { $gte:200000 ,$lt:300000 } };
          break
        case '30万以上':
          query = { carPrice : { $gte:300000 } };
          break;
      }
      let result = await this.carModel.find(query);
      return {
        result
      };
    } catch (error) {
      return error;
    }
  }
}
