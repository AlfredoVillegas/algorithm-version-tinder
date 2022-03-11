import { EntityRepository, EntityManager } from 'typeorm';
import { User } from '../../../domain/User';
import { UserEmail } from '../../../domain/UserEmail';
import { UserId } from '../../../domain/UserId';
import { UserRepository } from '../../../domain/UserRepository';
import { UserSchema } from './UserSchema';

@EntityRepository()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private manager: EntityManager) {}

  async save(user: User): Promise<void> {
    await this.manager.save(UserSchema, user);
  }

  async findById(id: UserId): Promise<User | null> {
    const userInDb = await this.manager.findOne(UserSchema, { id: id });
    if (!userInDb) {
      return null;
    }
    return userInDb;
  }

  async delete(id: UserId): Promise<void> {
    await this.manager.delete(UserSchema, { id: id });
  }

  async userEmailAlreadyExist(email: UserEmail): Promise<boolean> {
    const userInDb = await this.manager.findOne(UserSchema, { email: email });
    if (!userInDb) {
      return false;
    }
    return true;
  }
}
