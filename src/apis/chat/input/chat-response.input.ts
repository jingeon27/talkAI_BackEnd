import { InputType, OmitType } from '@nestjs/graphql';
import { ChatConversation } from '../entities/chatConversation.entity';

@InputType()
export class ChatResponseInput extends OmitType(
  ChatConversation,
  ['openAi', 'id'],
  InputType,
) {}
