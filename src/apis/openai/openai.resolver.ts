import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { OpenAiService } from './openai.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { OpenAi } from './entities/openai.entity';
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
    return this.openAiService.reflection({ question, situation, location });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => OpenAi)
  async chatResponseAuth(
    @Args({ name: 'question', type: () => [ChatResponseInput] })
    question: ChatResponseInput[],
    @Args('name') name: string,
    @Context() context,
  ) {
    return this.openAiService.createChat({ question, name, context });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [OpenAi])
  async chatList(@Context() context) {
    return this.openAiService.getChatList({ context });
  }

  @Mutation(() => String)
  async chatResponse(
    @Args({ name: 'question', type: () => [ChatResponseInput] })
    question: ChatResponseInput[],
  ): Promise<string> {
    return this.openAiService.chatResponse({ question });
  }
}
