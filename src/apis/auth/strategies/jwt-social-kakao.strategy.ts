import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}kakao`,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(profile._json.kakao_account.profile);
    console.log(JSON.parse(profile._raw), profile);
    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
      profile: process.env.IMAGE_URL,
    };
  }
}
