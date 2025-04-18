import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {  InjectModel } from '@nestjs/mongoose';
import { Video } from '../database/schemas/video.schema';
import { Model } from 'mongoose';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel:Model<Video>
  ){
  }
  async getVideoList(page,pageSize){
    try {
      let result = await this.videoModel.find().skip((page-1)*pageSize).limit(pageSize);
      return {
        result
      }
    } catch (error) {
      return error;
    }
  }
}
