import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AppService {
  private CONTEXT_INSTRUCTION = 'Based on this context:';
  private INSTRUCTION = `Answer the question below as truthfully as you can, if you don't know the answer, say you don't know in a sarcastic way otherwise, just answer.`;
  private openai: OpenAIApi;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
