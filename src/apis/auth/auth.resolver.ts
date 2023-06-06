import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/common/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(
    @Args('email') email: string, //
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({ email, context });
  }

  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  reissue(@Context() context: IContext): string {
    return this.authService.reissueAccessToken({ user: context.req.user });
  }
}
