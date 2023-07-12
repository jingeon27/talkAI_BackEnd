import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { ChatResponseInput } from '../chat/input/chat-response.input';

@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Mutation(() => String)
  chatResponse(
    @Args({ name: 'chat', type: () => [ChatResponseInput] })
    chat: ChatResponseInput[],
  ): Promise<string> {
    return this.aiService.chatResponse({ chat });
  }

  @Mutation(() => String)
  profileImage(@Args('prompt') prompt: string) {
    return this.aiService.generateProfileImage({ prompt });
  }
}
