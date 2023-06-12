import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';
@Entity()
@ObjectType()
export class OpenAi {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Int)
  date: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => String)
  role: string;
}
