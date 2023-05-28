import { ObjectType } from '@nestjs/graphql';
import { AiText } from 'src/apis/openai/entities/openai.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
@ObjectType()
export class List {
  @JoinColumn()
  @OneToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToMany(() => AiText, (aiText) => aiText.user)
  title: AiText[];
}
