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

  validate(accessToken: string, refreshToken: string, profile: Profile, photo) {
    console.log(profile._json.kakao_account.profile);
    console.log(JSON.parse(profile._raw), profile, photo);
    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
    };
  }
}
