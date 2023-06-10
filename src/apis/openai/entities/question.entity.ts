import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OpenAi } from 'src/apis/openai/entities/openai.entity';

@Entity()
@ObjectType()
export class ChatConversation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => OpenAi)
  @JoinColumn()
  @Field(() => OpenAi)
  openAi: OpenAi;

  @Column()
  @Field(() => String)
  role: 'system' | 'user' | 'assistant';

  @Column()
  @Field(() => String)
  content: string;
}
