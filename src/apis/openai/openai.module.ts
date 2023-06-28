import { Module } from '@nestjs/common';
import { OpenAiResolver } from './openai.resolver';
import { OpenAiService } from './openai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAi } from './entities/openai.entity';
import { ChatConversation } from '../chat/entities/chatConversation.entity';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { AiModule } from '../ai/ai.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpenAi, ChatConversation]),
    AiModule,
    ChatModule,
  ],
  providers: [OpenAiResolver, OpenAiService, DateScalar],
})
export class OpenAiModule {}
