import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/User';
import { UserEmail } from '../../../domain/UserEmail';
import { UserId } from '../../../domain/UserId';
import { UserName } from '../../../domain/UserName';
import { UserPassword } from '../../../domain/UserPassword';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: {
        from: (value: string): UserId => new UserId(value),
        to: (value: UserId): string => value.value
      }
    },
    name: {
      type: String,
      transformer: {
        from: (value: string): UserName => new UserName(value),
        to: (value: UserName): string => value.value
      }
    },
    email: {
      type: String,
      transformer: {
        from: (value: string): UserEmail => new UserEmail(value),
        to: (value: UserEmail): string => value.value
      }
    },
    password: {
      type: String,
      transformer: {
        from: (value: string): UserPassword => new UserPassword(value),
        to: (value: UserPassword): string => value.value
      }
    }
  }
});
// **/
