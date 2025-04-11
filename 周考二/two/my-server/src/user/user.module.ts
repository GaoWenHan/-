import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModule as UserList } from '../database/models/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UserList,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async (configService:ConfigService) => ({
        secret:configService.get('JWT_SECRET'),
        signOptions:{expiresIn:'1h'},
      }),
      inject:[ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
