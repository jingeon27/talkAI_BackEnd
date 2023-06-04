// import { Field, ObjectType } from '@nestjs/graphql';
// import { OpenAi } from 'src/apis/openai/entities/openai.entity';
// import { User } from 'src/apis/users/entities/user.entity';
// import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

// @Entity()
// @ObjectType()
// export class List {
//   @OneToOne(() => User)
//   @Field(() => User)
//   user: User;

//   @JoinColumn()
//   @OneToMany(() => OpenAi, (openAi) => openAi.user)
//   @Field(() => OpenAi)
//   title: OpenAi[];
// }
