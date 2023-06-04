import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { OpenAiService } from './openai.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { OpenAi } from './entities/openai.entity';
import { IContext } from 'src/common/interfaces/context';
import { ChatResponseInput } from './dto/chat-response.input';

@Resolver()
export class OpenAiResolver {
  constructor(private readonly openAiService: OpenAiService) {}

  // @UseGuards(GqlAuthGuard('access'))
  // @Query(() => String)
  // async animalName(
  //   @Args('question') question: string,
  //   @Args('id') id: string,
  //   @Context() context: IContext,
  // ) {
  //   return this.openAiService.createCompletion({ question, id, context });
  // }

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
  async chatResponse(
    @Args({ name: 'question', type: () => [ChatResponseInput] })
    question: ChatResponseInput[],
  ): Promise<string> {
    return this.openAiService.chatResponse({ question });
  }
}
