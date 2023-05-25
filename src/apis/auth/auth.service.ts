import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceReissueAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    this.setRefreshToken({ user, context });

    return this.getAccessToken({ user });
  }

  reissueAccessToken({ user }: IAuthServiceReissueAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.REFRESH_PASSWORD, expiresIn: '2w' },
    );
    context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=;`);
    // 배포환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=; domain=.mybacksite.com; SameSite=none; Secure; httpOnly`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://myfrontsite.com',
    // );
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.ACCESS_PASSWORD, expiresIn: '24h' },
    );
  }
}
