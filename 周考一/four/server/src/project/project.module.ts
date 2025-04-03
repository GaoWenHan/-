import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectModel } from '../Database/models/project.model';
import { ColorsModel } from '../Database/models/colors.model';
import { ListModel } from '../Database/models/list.model';
import { ItemModel } from '../Database/models/item.model';

@Module({
  imports:[ItemModel,ListModel,ProjectModel,ColorsModel],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
