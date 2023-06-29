import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatConversation } from './entities/chatConversation.entity';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ChatConversation])],
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
