import { Uuid } from '../../shared/domain/Uuid';

export class Matches {
  readonly id: Uuid;
  readonly personOne: Uuid;
  readonly personTwo: Uuid;
  readonly createdAt: Date;

  constructor(id: string, personOne: string, personTwo: string, createAt: Date) {
    this.id = new Uuid(id);
    this.personOne = new Uuid(personOne);
    this.personTwo = new Uuid(personTwo);
    this.createdAt = createAt;
  }
  static Create(personOne: string, personTwo: string): Matches {
    const createAt = new Date();
    const id = Uuid.random().toString();

    const matches = new Matches(id, personOne, personTwo, createAt);

    return matches;
  }
}
