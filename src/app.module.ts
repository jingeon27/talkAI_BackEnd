import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { OpenAiModule } from './apis/openai/openai.module';
import { AiModule } from './ai/ai.module';
import { ChatModule } from './chat/chat.module';
import { AiResolver } from './ai/ai.resolver';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    OpenAiModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [`${__dirname}/apis/**/*.entity.*`],
      synchronize: false,
      logging: true,
    }),
    AiModule,
    ChatModule,
  ],
  providers: [AiResolver],
})
export class AppModule {}
