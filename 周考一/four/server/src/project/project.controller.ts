import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CommonResponseDto } from '../common/CommonResponseDto';
import { CreateProjectDto } from './dto/create-project.dto';

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
  @Post('addProject')
  async createPrjectApI(@Body() createProjectDto:CreateProjectDto){
    await this.projectService.createProject(createProjectDto)
    return new CommonResponseDto(200,'添加成功')
  }
}
