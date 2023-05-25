import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/common/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}
export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}
export interface IAuthServiceSetRefreshToken
  extends IAuthServiceGetAccessToken {
  context: IContext;
}

export interface IAuthServiceReissueAccessToken {
  user: IAuthUser['user'];
}
