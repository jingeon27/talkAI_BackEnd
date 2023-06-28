import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatConversation } from './entities/chatConversation.entity';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatConversation])],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
