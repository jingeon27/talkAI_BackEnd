import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ChatConversation } from './entities/chatConversation.entity';
@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [ChatConversation])
  getBeforeChat(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.chatService.find({ id });
  }
}
