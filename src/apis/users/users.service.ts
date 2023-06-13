import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IUserServiceGetUserInfo,
  IUsersServiceCreate,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ email, name }: IUsersServiceCreate): Promise<User> {
    return this.userRepository.save({
      name,
      email,
    });
  }

  async getUserInfo({ context }: IUserServiceGetUserInfo): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: context.req.user.id },
    });
  }
}
