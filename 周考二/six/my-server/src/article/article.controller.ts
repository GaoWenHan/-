import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto ,CreateArticleBDto} from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CommonResponseDto } from '../common/CommonResponseDto/CommonResponseDto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post('login')
  async login(@Body() createArticleDto: CreateArticleDto) {
    try {
      let result = await this.articleService.GoLogin(createArticleDto);
      return new CommonResponseDto(200, '登录成功', result); 
    } catch (error) {
      return new CommonResponseDto(500, '登录失败', error);
    }
  }
  @Get('articleA')
  async ArticleAS(){
    try {
      let result = await this.articleService.GetArticleA();
      return new CommonResponseDto(200, '获取成功 ', result);
    } catch (error) {
      return new CommonResponseDto(500, '获取失败', error);
    }
  }
  @Get('articleB')
  async ArticleBS(){
    try {
      let result = await this.articleService.GetArticleB();
      return new CommonResponseDto(200, '获取成功 ', result);
    } catch (error) {
      return new CommonResponseDto(500, '获取失败', error);
    }
  }
  @Post('addArticleA')
  async addArticleA(@Query('title') title:string){
    try {
      let result = await this.articleService.CreateArticleA(title);
      return new CommonResponseDto(200, '添加成功 ', result);
    } catch (error) {
      return new CommonResponseDto(500, '添加失败', error);
    }
  }
  @Post('deleteArticleA')
  async deleteArticleA(@Query('id') id:string){
    try {
      console.log(id);
      await this.articleService.DelArticleA(id);
      return new CommonResponseDto(200, '删除成功 ');
    } catch (error) {
      return new CommonResponseDto(500, '删除失败', error);
    }
  }
  @Post('addArticleB')
  async addArticleB(@Body() createArticleBDto:CreateArticleBDto){
    try {
      await this.articleService.CreateArticleB(createArticleBDto);
      return new CommonResponseDto(200, '添加成功 ');
    } catch (error) {
      return new CommonResponseDto(500, '添加失败', error);
    }
  }
}
