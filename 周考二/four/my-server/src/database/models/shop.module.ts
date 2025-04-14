import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from '../schemas/shop.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:'Shop',
            schema:ShopSchema
        }])
    ],
    exports:[MongooseModule]
})

export class ShopModule {
    
}