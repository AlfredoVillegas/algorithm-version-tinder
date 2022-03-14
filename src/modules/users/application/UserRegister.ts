import { EventBus } from '../../shared/domain/EventBus';
import { UserEmailAlreadyExists } from '../domain/Errors';
import { Hashing } from '../domain/Hashing';
import { HashUserPassword } from '../domain/HashUserPassword';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserRegisterDomainEvent } from '../domain/UserRegisterDomainEvent';
import { UserRepository } from '../domain/UserRepository';

export type Params = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class UserRegister {
  private repository: UserRepository;
  private hashUserPasswordService: HashUserPassword;
  private eventBus: EventBus;

  constructor(hasher: Hashing, repository: UserRepository, eventBus: EventBus) {
    this.repository = repository;
    this.hashUserPasswordService = new HashUserPassword(hasher);
    this.eventBus = eventBus;
  }

  async run({ id, name, email, password }: Params): Promise<void> {
    const userEmail = new UserEmail(email);

    if (await this.repository.userEmailAlreadyExist(userEmail)) {
      throw new UserEmailAlreadyExists(userEmail.value);
    }

    const userPassword = await this.hashUserPasswordService.run(new UserPassword(password));

    const user = User.regiter(new UserId(id), new UserName(name), userEmail, userPassword);

    await this.repository.save(user);

    const userRegisteredDomainEvent = new UserRegisterDomainEvent(user.id.value, user.email.value, user.name.value);
    await this.eventBus.publish([userRegisteredDomainEvent]);
  }
}
