import { Resolver, Query, Args, Context, Mutation, ID } from '@nestjs/graphql';
import { OpenAiService } from './openai.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { OpenAi } from './entities/openai.entity';
import { ChatResponseInput } from '../chat/input/chat-response.input';
import { ChatConversation } from '../chat/entities/chatConversation.entity';

@Resolver()
export class OpenAiResolver {
  constructor(private readonly openAiService: OpenAiService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => OpenAi)
  createChat(
    @Args({ name: 'chat', type: () => [ChatResponseInput] })
    chat: ChatResponseInput[],
    @Args('name') name: string,
    @Args('role') role: string,
    @Context() context,
  ) {
    return this.openAiService.create({ chat, name, context, role });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [OpenAi])
  chatList(@Context() context) {
    return this.openAiService.getChatList({ context });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => ChatConversation)
  updateChat(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'chat', type: () => [ChatResponseInput] })
    chat: ChatResponseInput[],
  ) {
    return this.openAiService.update({ id, chat });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => OpenAi)
  getOpenAi(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.openAiService.getOpenAiEntity({ id });
  }
}
