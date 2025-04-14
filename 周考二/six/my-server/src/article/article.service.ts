import { Injectable } from '@nestjs/common';
import { CreateArticleDto,CreateArticleBDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../database/schemas/user.schema';
import { ArticleA } from '../database/schemas/articleA.schema';
import { ArticleB } from '../database/schemas/articleB.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ArticleA.name) private readonly articleAModel: Model<ArticleA>,
    @InjectModel(ArticleB.name) private readonly articleBModel: Model<ArticleB>,
    private readonly jwtService: JwtService,
  ) {
  }
  private generateToken(user){
    const payload = {username:user.username,sub:user._id}
    const token = this.jwtService.sign(payload);
    return {
      token
    }
  }

  async ValidateUser(username,password){
    const user = await this.userModel.findOne({username});
    if(user && user.password === password){
      return user;
    }
    return null;
  }

  async GoLogin(createArticleDto: CreateArticleDto) {
    try {
      const { username, password } = createArticleDto;
      const user = await this.ValidateUser(username, password);
      if(!user) return null;
      return this.generateToken(user);
    } catch (error) {
      return error;
    }
  }

  async GetArticleA() {
    try {
      let result = await this.articleAModel.find();
      return { result };
    } catch (error) {
      return error;
    }
  }

  async GetArticleB() {
    try {
      let result = await this.articleBModel.find();
      return { result };
    } catch (error) {
      return error;
    }
  }

  async CreateArticleA(title){
    try {
      let result = await this.articleAModel.create({title});
      return { result };
    } catch (error) {
      return error;
    }
  }

  async DelArticleA(id){
    try {
      await this.articleAModel.findByIdAndDelete({_id:id});
      return ;
    } catch (error) {
      return error;
    }
  }

  async CreateArticleB(createArticleBDto:CreateArticleBDto){
    try {
      await this.articleBModel.create(createArticleBDto);
      return ;
    } catch (error) {
      return error;
    }
  }
}
