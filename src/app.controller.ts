import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAnimal(@Query() animal: string): Promise<string> {
    return this.appService.createCompletion(animal);
  }
}
