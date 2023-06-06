import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatResponseInput {
  @Field(() => String)
  role: 'system' | 'user' | 'assistant';
  @Field(() => String)
  content: string;
}
