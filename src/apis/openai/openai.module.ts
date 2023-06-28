import { Module } from '@nestjs/common';
import { OpenAiResolver } from './openai.resolver';
import { OpenAiService } from './openai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAi } from './entities/openai.entity';
import { ChatConversation } from './entities/question.entity';
import { DateScalar } from 'src/common/scalars/date.scalar';
@Module({
  imports: [TypeOrmModule.forFeature([OpenAi, ChatConversation])],
  providers: [OpenAiResolver, OpenAiService, DateScalar],
})
export class OpenAiModule {}
