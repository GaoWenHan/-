import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UserModule as UserList } from '../database/models/user.module';
import { ProfileModule } from '../database/models/profile.module';


@Module({
  imports:[
    UserList,
    ProfileModule,
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
