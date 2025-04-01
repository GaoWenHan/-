import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../Database/schemas/project.schema';
import { Colors } from '../Database/schemas/colors.schema';

@Injectable()
export class ProjectService {
 constructor(
   @InjectModel(Project.name) private  projectModel:Model<Project>,
   @InjectModel(Colors.name) private colorsModel:Model<Colors>
 ){}
 async getProject(){
  try {
    let ProjectData = await this.projectModel.find()
    return {ProjectData}
  } catch (error) {
    return error;
  }
 }
 async getColors(){
  try {
    let ColorsData = await this.colorsModel.find()
    return {ColorsData}
  } catch (error) {
    return error;
  }
 }
}
