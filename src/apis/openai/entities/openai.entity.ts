import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class AiText {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('simple-json')
  @Field(() => [{ ai: String, user: String }])
  res: { ai: string; user: string }[];

  @Column()
  @Field(() => String)
  title: string;

  @JoinColumn()
  @ManyToOne(() => User)
  user: User;
}
