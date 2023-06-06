import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { OpenAiService } from './openai.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { OpenAi } from './entities/openai.entity';
import { IContext } from 'src/common/interfaces/context';
import { ChatResponseInput } from './input/chat-response.input';

@Resolver()
export class OpenAiResolver {
  constructor(private readonly openAiService: OpenAiService) {}

  @Query(() => String)
  async newQuestion(
    @Args('question') question: number,
    @Args('situation') situation: string,
    @Args('location') location: string,
  ): Promise<string> {
    return this.openAiService.newQuestion({ question, situation, location });
  }
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  async chatResponseAuth(
    @Args({ name: 'question', type: () => [ChatResponseInput] })
    question: ChatResponseInput[],
  ): Promise<string> {
    return this.openAiService.chatResponse({ question });
  }

  @Mutation(() => String)
  async chatResponse(
    @Args({ name: 'question', type: () => [ChatResponseInput] })
    question: ChatResponseInput[],
  ): Promise<string> {
    return this.openAiService.chatResponse({ question });
  }
}
