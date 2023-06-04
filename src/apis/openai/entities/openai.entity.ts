import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class OpenAi {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('simple-array')
  @Field(() => [String])
  answer: string[];

  @Column('simple-array')
  @Field(() => [String])
  question: string[];

  @Column()
  @Field(() => String)
  title: string;
}
