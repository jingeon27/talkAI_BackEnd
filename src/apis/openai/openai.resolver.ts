import { Mutation, Resolver } from '@nestjs/graphql';
import { OpenAiService } from './openai.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Query } from '@nestjs/common';

@Resolver()
export class OpenAiResolver {
  constructor(private readonly openAiService: OpenAiService) {}
  async animalName() {
    return this.openAiService.createCompletion();
  }
}
