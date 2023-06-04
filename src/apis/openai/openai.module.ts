import { Module } from '@nestjs/common';
import { OpenAiResolver } from './openai.resolver';
import { OpenAiService } from './openai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAi } from './entities/openai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpenAi])],
  providers: [OpenAiResolver, OpenAiService],
})
export class OpenAiModule {}
