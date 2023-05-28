import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private CONTEXT_INSTRUCTION = 'Based on this context:';
  private INSTRUCTION = ``;
  private openai: OpenAIApi;
  constructor() {
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
  async createCompletion(animal: string) {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Suggest three names for an animal that is a superhero.

Animal:고양이
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: 개
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${animal}
Names:`,
      max_tokens: 300,
      temperature: 1,
    });

    return completion?.data.choices?.[0]?.text;
  }
}
