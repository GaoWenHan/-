import { Injectable } from '@nestjs/common';
import { Model,Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../Database/schemas/project.schema';
import { Colors } from '../Database/schemas/colors.schema';
import { List } from '../Database/schemas/list.schema';
import { Item } from '../Database/schemas/item.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateListDto } from './dto/create-list.dto';
import { CreateItemDto } from './dto/create-item.dto';
import * as mongoose from 'mongoose'

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Colors.name) private colorsModel: Model<Colors>,
    @InjectModel(List.name) private listModel: Model<List>,
    @InjectModel(Item.name) private itemModel: Model<Item>
  ) { }
  async getProject() {
    try {
      let ProjectData = await this.projectModel.find()
      return { ProjectData }
    } catch (error) {
      return error;
    }
  }
  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const newProject = new this.projectModel(createProjectDto);
      return await newProject.save();
    } catch (error) {
      return error;
    }
  }
  async getColors() {
    try {
      let ColorsData = await this.colorsModel.find()
      return { ColorsData }
    } catch (error) {
      return error;
    }
  }
  async getProjectItem(id: string) {
    try {
      let ProjectItem = await this.projectModel.find({_id:id});
      let ListData = await this.listModel.find({LId:id})
      let ItemData = await this.itemModel.find()
      return {
        ProjectItem,
        ListData,
        ItemData
      }
    } catch (error) {
      return error;
    }
  }
  

  async createList(createListDto: CreateListDto) {
    try {
      const newList = new this.listModel(createListDto)
      return await newList.save();
    } catch (error) {
      return error
    }
  }

  async createItem(createItemDto: CreateItemDto) {
    try {
      const newItem = new this.itemModel(createItemDto)
      return await newItem.save();
    } catch (error) {
      return error;
    }
  }
}
