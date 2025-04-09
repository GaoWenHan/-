import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { BrandModule } from '../Database/models/brand.model';
import { VehicleModule } from '../Database/models/vehicle.model';
import { CarModule as CarList } from '../Database/models/car.model';

@Module({
  imports:[
    BrandModule,
    VehicleModule,
    CarList
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
