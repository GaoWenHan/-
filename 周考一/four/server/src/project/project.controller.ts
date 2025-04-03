import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CommonResponseDto } from '../common/CommonResponseDto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateListDto } from './dto/create-list.dto';
import { CreateItemDto } from './dto/create-item.dto';

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
  @Get('Detail')
  async getProjectItem(@Query('id') id:string ){
    let ProjectItem =  await this.projectService.getProjectItem(id)
    return new CommonResponseDto(200,'获取成功',ProjectItem)
  }
  @Post('addList')
  async createListAPI(@Body() createListDto:CreateListDto){
    await this.projectService.createList(createListDto)
    return new CommonResponseDto(200,'添加成功')
  }
  @Post('addItem')
  async CreateItemAPI(@Body() createItemDto:CreateItemDto){
    await this.projectService.createItem(createItemDto);
    return new CommonResponseDto(200,'添加成功')
  }
}
