import { InputType, OmitType } from '@nestjs/graphql';
import { ChatConversation } from '../entities/question.entity';

@InputType()
export class ChatResponseInput extends OmitType(
  ChatConversation,
  ['openAi', 'id'],
  InputType,
) {}
