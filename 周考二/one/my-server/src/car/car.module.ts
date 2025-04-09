import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { BrandModule } from '../Database/models/brand.model';
import { VehicleModule } from '../Database/models/vehicle.model';

@Module({
  imports:[
    BrandModule,
    VehicleModule
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
