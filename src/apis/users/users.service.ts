import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IUserServiceGetUserInfo,
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(props: IUsersServiceCreate): Promise<User> {
    return this.userRepository.save(props);
  }

  async getUserInfo({ context }: IUserServiceGetUserInfo): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: context.req.user.id },
    });
  }
}
