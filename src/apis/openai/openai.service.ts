import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IChatResponse,
  IGetChatConversation,
  IGetChatList,
  IOpenAiServiceCreateChat,
  IOpenAiServiceUpdateChat,
} from './interface/openai.interface';
import { ChatConversation } from './entities/question.entity';
import { OpenAi } from 'src/apis/openai/entities/openai.entity';

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;
  constructor(
    @InjectRepository(OpenAi)
    private readonly openaiRepository: Repository<OpenAi>,

    @InjectRepository(ChatConversation)
    private readonly chatConversation: Repository<ChatConversation>,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async chatResponse({ chat }: IChatResponse): Promise<string> {
    const completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chat,
    });
    return completion?.data.choices[0].message.content;
  }
  async getOpenAiEntity({ id }: IGetChatConversation) {
    return await this.openaiRepository.findOne({ where: { id } });
  }

  async getChatList({ context }: IGetChatList): Promise<OpenAi[]> {
    return await this.openaiRepository.find({
      where: { user: context.req.user },
      order: { date: 'DESC' },
    });
  }
  async getChatConversations({ id }: IGetChatConversation) {
    return await this.chatConversation.find({
      where: {
        openAi: { id },
      },
      order: { id: 'DESC' },
    });
  }

  async update({ chat, id }: IOpenAiServiceUpdateChat) {
    const content = await this.chatResponse({ chat });
    await this.openaiRepository.save({
      id,
      date: parseInt(
        new Date().toISOString().substring(0, 10).replace(/-/g, ''),
      ),
    });
    await this.chatConversation.save({ openAi: { id }, ...chat.at(-1) });
    return this.chatConversation.save({
      openAi: { id },
      content,
      role: 'assistant',
    });
  }
  async create({ chat, context, name, role }: IOpenAiServiceCreateChat) {
    const title = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${chat[1].content}를 요약해줘`,
      max_tokens: 30,
    });
    const response = await this.openaiRepository.save({
      title: title.data.choices[0].text,
      user: context.req.user,
      date: parseInt(
        new Date().toISOString().substring(0, 10).replace(/-/g, ''),
      ),
      name,
      role,
    });
    this.chatConversation.insert({ ...chat[0], openAi: response });
    return response;
  }
}
