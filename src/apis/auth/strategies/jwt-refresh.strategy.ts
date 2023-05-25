import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.repolace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_PASSWORD,
    });
  }
  validate(payload) {
    return {
      id: payload.sub,
    };
  }
}
