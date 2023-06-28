import { Injectable } from '@nestjs/common';
import { ChatConversation } from './entities/chatConversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenAIApi, Configuration } from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAIApi;
  constructor(
    @InjectRepository(ChatConversation)
    private readonly chatConversation: Repository<ChatConversation>,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }
}
