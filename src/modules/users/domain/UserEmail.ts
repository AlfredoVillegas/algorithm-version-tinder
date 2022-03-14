import { InvalidArgumentError } from '../../shared/domain/InvalidArgumentError';

export class UserEmail {
  readonly value: string;

  constructor(email: string) {
    this.validate(email.toLowerCase());
    this.value = email.toLowerCase();
  }

  private validate(email: string) {
    const regex = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!regex.test(email)) {
      throw new InvalidArgumentError(`email ${email} is not valid`);
    }
  }
}
