import { UserNotExist } from '../domain/Errors';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class UserSearchAll {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(): Promise<User[]> {
    const user = await this.repository.searchAll();

    if (!user) {
      throw new UserNotExist('Not exists user');
    }

    return user;
  }
}
