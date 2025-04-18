import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { CommonResponseDto } from '../common/CommonResponseDto/CommonResponseDto';

class VideoQueryDto {
  page: number;
  pageSize: number;
}

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @Get('List')
  async getList(@Query() query:VideoQueryDto) {
    try {
      const { page,pageSize } = query;
      console.log(page,pageSize);
      
      let result = await this.videoService.getVideoList(page,pageSize);
      return new CommonResponseDto(200,'请求成功',result);
    } catch (error) {
      return new CommonResponseDto(500,'请求失败',error);
    }
  }
}
