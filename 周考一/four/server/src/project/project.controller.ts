import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CommonResponseDto } from '../common/CommonResponseDto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get('List')
  async getProjectList(){
    let data = await this.projectService.getProject();
    return new CommonResponseDto(200,'请求成功',data)
  }
  @Get('Colors')
  async getColorsList(){
    let data = await this.projectService.getColors();
    return new CommonResponseDto(200,'请求成功',data)
  }
}
