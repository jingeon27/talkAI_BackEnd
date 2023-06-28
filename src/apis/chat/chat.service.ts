import { Injectable } from '@nestjs/common';
import { ChatConversation } from './entities/chatConversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetChatConversation } from './interfaces/chat.interface';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatConversation)
    private readonly chatConversation: Repository<ChatConversation>,
  ) {}

  async find({ id }: IGetChatConversation) {
    return await this.chatConversation.find({
      where: {
        openAi: { id },
      },
      order: { id: 'DESC' },
    });
  }
  async insert(data: Omit<ChatConversation, 'id'>) {
    await this.chatConversation.insert(data);
  }
  async save({
    id,
    ...args
  }: Omit<ChatConversation, 'id' | 'openAi'> & { id: number }) {
    return this.chatConversation.save({ openAi: { id }, args });
  }
}
