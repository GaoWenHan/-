import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { DatabaseModule } from './Database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModel } from './Database/models/project.model';
import { ColorsModel } from './Database/models/colors.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ColorsModel,
    ProjectModel,
    ProjectModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
