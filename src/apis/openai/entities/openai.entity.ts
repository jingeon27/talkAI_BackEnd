import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';
@Entity()
@ObjectType()
export class OpenAi {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  date: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => String)
  role: string;

  @Column({
    type: 'longtext',
  })
  @Field(() => String)
  profile: string;
}
