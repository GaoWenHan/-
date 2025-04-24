import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


console.log(process.env.MONGODB_URI);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
