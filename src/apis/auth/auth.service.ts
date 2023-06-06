import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceLoginOAuth,
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
  async login({ email, context }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    this.setRefreshToken({ user, res: context.res });
    return this.getAccessToken({ user });
  }

  reissueAccessToken({ user }: IAuthServiceReissueAccessToken): string {
    return this.getAccessToken({ user });
  }

  async loginOAuth({ req, res }: IAuthServiceLoginOAuth) {
    // 1. 회원조회
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });

    // 2. 회원가입이 안돼있다면? 자동회원가입
    if (!user) user = await this.usersService.create({ ...user });

    // 3. 회원가입이 돼있다면? 로그인(refreshToken, accessToken 만들어서 브라우저에 전송)
    this.setRefreshToken({ user, res });
    res.redirect(process.env.REDIRECT_URL);
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.REFRESH_PASSWORD, expiresIn: '2w' },
    );
    // 개발환경
    res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.ACCESS_PASSWORD, expiresIn: '24h' },
    );
  }
}
