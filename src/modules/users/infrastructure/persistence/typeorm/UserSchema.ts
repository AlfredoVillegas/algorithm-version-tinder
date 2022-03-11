import { EntitySchema } from 'typeorm';
import { UuidTransformerOrm } from '../../../../shared/infrastructure/percistence/typeorm/UuidTransformerOrm';
import { User } from '../../../domain/User';
import { UserEmail } from '../../../domain/UserEmail';
import { UserName } from '../../../domain/UserName';
import { UserPassword } from '../../../domain/UserPassword';

export const UserSchema = new EntitySchema<User>({
  name: 'Users',
  tableName: 'users',
  target: User,

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: UuidTransformerOrm
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
