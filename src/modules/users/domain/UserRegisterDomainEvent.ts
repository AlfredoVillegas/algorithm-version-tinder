import { DomainEvent } from '../../shared/domain/DomainEvent';

export class UserRegisterDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.register';
  readonly userId: string;
  readonly userName: string;
  readonly email: string;

  constructor(userId: string, email: string, name: string) {
    super(UserRegisterDomainEvent.EVENT_NAME);
    this.userId = userId;
    this.userName = name;
    this.email = email;
  }
}
