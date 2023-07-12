import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import {
  IAiServiceGenerateProfileImage,
  IChatResponse,
  ISummary,
} from './interfaces/ai.interface';

@Injectable()
export class AiService {
  private openai: OpenAIApi;
  constructor() {
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

  async generateProfileImage({ prompt }: IAiServiceGenerateProfileImage) {
    const response = await this.openai.createImage({
      prompt,
      n: 1,
      size: '256x256',
    });
    return response.data.data[0].url;
  }

  async summary({ content }: ISummary): Promise<string> {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${content}를 요약해줘`,
      max_tokens: 30,
    });
    return completion.data.choices[0].text;
  }
}
