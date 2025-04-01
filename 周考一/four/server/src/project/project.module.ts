import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectModel } from '../Database/models/project.model';
import { ColorsModel } from '../Database/models/colors.model';

@Module({
  imports:[ProjectModel,ColorsModel],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
