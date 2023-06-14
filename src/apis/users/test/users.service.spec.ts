import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

export class userMockRepository {
  users = [
    { email: 'jingeon27@gmail.com', name: '김진건' },
    { email: 'asdf1234@gmail.com', name: '이진형' },
  ];
  findOne({ where }) {
    const users = this.users.find((item) => item.email === where.email);
    if (users === undefined) return null;
    return users;
  }
  save({ email, name }) {
    this.users.push({ email, name });
    return this.findOne({ where: { email } });
  }
}

describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: userMockRepository },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  it('findOneByEmail', async () => {
    const result = await usersService.findOneByEmail({
      email: 'jingeon27@gmail.com',
    });
    expect(result).toStrictEqual({
      email: 'jingeon27@gmail.com',
      name: '김진건',
    });
  });

  it('create', async () => {
    const data = {
      email: 'jingeon27@gmail.com',
      name: '김진건',
    };
    const result = await usersService.create(data);
    expect(result).toStrictEqual(data);
  });
});
