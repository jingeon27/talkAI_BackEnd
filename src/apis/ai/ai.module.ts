import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiResolver } from './ai.resolver';

@Module({
  providers: [AiService, AiResolver],
  exports: [AiService],
})
export class AiModule {}
