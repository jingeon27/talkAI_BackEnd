import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  IAuthServiceGetAccessToken,
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

  reissueAccessToken({ user }: IAuthServiceReissueAccessToken): string {
    return this.getAccessToken({ user });
  }

  async loginOAuth({ req, res }: IAuthServiceLoginOAuth) {
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.setRefreshToken({ user, res });
    res.redirect(process.env.REDIRECT_URL);
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.REFRESH_PASSWORD, expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.ACCESS_PASSWORD, expiresIn: '24h' },
    );
  }
}
