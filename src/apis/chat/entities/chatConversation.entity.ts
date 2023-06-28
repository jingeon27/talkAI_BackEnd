import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OpenAi } from 'src/apis/openai/entities/openai.entity';

@Entity()
@ObjectType()
export class ChatConversation {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @ManyToOne(() => OpenAi)
  @Field(() => OpenAi)
  openAi: OpenAi;

  @Column()
  @Field(() => String)
  role: 'system' | 'user' | 'assistant';

  @Column('longtext')
  @Field(() => String)
  content: string;
}
