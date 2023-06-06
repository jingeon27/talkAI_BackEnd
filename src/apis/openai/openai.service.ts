import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { Repository } from 'typeorm';
import { OpenAi } from './entities/openai.entity';
import { IContext } from 'src/common/interfaces/context';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatResponseInput } from './input/chat-response.input';

@Injectable()
export class OpenAiService {
  private CONTEXT_INSTRUCTION = 'Based on this context:';
  private INSTRUCTION = ``;
  private openai: OpenAIApi;
  constructor(
    @InjectRepository(OpenAi)
    private readonly openaiRepository: Repository<OpenAi>,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async createMenuList(prompt: string, context: string) {
    const completion = await this.openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: `${this.CONTEXT_INSTRUCTION}\n\n\nContext: "${context}" \n\n\n${this.INSTRUCTION} \n\n\n ${prompt}`,
      max_tokens: 300,
      temperature: 1,
    });

    return completion?.data.choices?.[0]?.text;
  }
  async newQuestion({
    location,
    situation,
    question,
  }: {
    location: string;
    situation: string;
    question: number;
  }): Promise<string> {
    const max_tokens = question + 1000;
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${location}에서 ${situation}이란 상황으로 ${question}자보다 많지만 인접하게 반성문을 작성해줘`,
      max_tokens,
      temperature: 1,
    });
    console.log(completion?.data.choices?.[0]?.text);
    return completion?.data.choices?.[0]?.text;
  }
  async chatResponse({
    question,
  }: {
    question: ChatResponseInput[];
  }): Promise<string> {
    const completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '너는 도움을 주는 비서야' },
        ...question,
      ],
    });
    return completion?.data.choices[0].message.content;
  }
}
