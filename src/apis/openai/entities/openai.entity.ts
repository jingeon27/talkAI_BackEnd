import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ChatResponseInput } from '../input/chat-response.input';

@Entity()
@ObjectType()
export class OpenAi {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column('simple-array')
  @Field(() => [ChatResponseInput])
  question: ChatResponseInput[];
}
