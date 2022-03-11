import { InvalidArgumentError } from '../../shared/domain/InvalidArgumentError';

export class UserPassword {
  readonly value: string;

  constructor(password: string) {
    this.value = password;
  }

  public validateLengthIsHigher8(value: string) {
    if (value.length < 6) {
      throw new InvalidArgumentError('password debe contener almenos 6 caracteres');
    }
  }
}
