import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/common/interfaces/context';
import { Request, Response } from 'express';

export interface IAuthServiceLogin {
  email: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAuthServiceReissueAccessToken {
  user: IAuthUser['user'];
}
export interface IOAuthUser {
  user: Omit<User, 'id'>;
}
export interface IAuthServiceLoginOAuth {
  req: Request & IOAuthUser;
  res: Response;
}
