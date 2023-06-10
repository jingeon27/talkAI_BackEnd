import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';
@Entity()
@ObjectType()
export class OpenAi {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  date: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
