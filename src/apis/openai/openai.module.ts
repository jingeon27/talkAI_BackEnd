import { Module } from '@nestjs/common';
import { OpenAiResolver } from './openai.resolver';
import { OpenAiService } from './openai.service';

@Module({
  providers: [OpenAiResolver, OpenAiService],
})
export class OpenAiModule {}
