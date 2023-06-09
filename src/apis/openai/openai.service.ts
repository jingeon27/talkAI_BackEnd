import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IGetChatList,
  IIdArgs,
  IOpenAiServiceCreateChat,
  IOpenAiServiceUpdateChat,
} from './interface/openai.interface';
import { OpenAi } from 'src/apis/openai/entities/openai.entity';
import { AiService } from '../ai/ai.service';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class OpenAiService {
  constructor(
    @InjectRepository(OpenAi)
    private readonly openaiRepository: Repository<OpenAi>,

    private readonly aiService: AiService,

    private readonly chatService: ChatService,
  ) {}

  async getOpenAiEntity({ id }: IIdArgs): Promise<OpenAi> {
    return await this.openaiRepository.findOne({ where: { id } });
  }

  async getChatList({ context }: IGetChatList): Promise<OpenAi[]> {
    return await this.openaiRepository.find({
      where: { user: context.req.user },
      order: { date: 'DESC' },
    });
  }

  async update({ chat, id }: IOpenAiServiceUpdateChat) {
    const content = await this.aiService.chatResponse({ chat });
    await this.openaiRepository.save({
      id,
      title: chat[chat.length - 1].content,
      date: new Date(),
    });
    await this.chatService.save({ id, ...chat.at(-1) });
    return this.chatService.save({
      id,
      content,
      role: 'assistant',
    });
  }

  async create({ chat, context, ...args }: IOpenAiServiceCreateChat) {
    const profile = await this.aiService.generateProfileImage({
      prompt: chat[1].content,
    });
    return await this.openaiRepository
      .save({
        user: context.req.user,
        date: new Date(),
        title: chat[1].content,
        profile,
        ...args,
      })
      .then((openAi) => {
        this.chatService.insert({ ...chat[0], openAi });
        return openAi;
      });
  }
}
