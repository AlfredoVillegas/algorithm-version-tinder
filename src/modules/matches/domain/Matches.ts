import { Uuid } from '../../shared/domain/Uuid';

export class Matches {
  readonly id: Uuid;
  readonly personOne: Uuid;
  readonly personTwo: Uuid;
  readonly createdAt: Date;

  constructor(id: Uuid, personOne: Uuid, personTwo: Uuid, createAt: Date) {
    this.id = id;
    this.personOne = personOne;
    this.personTwo = personTwo;
    this.createdAt = createAt;
  }
  static Create(personOne: Uuid, personTwo: Uuid): Matches {
    const createAt = new Date();
    const id = Uuid.random();

    const matches = new Matches(id, personOne, personTwo, createAt);

    return matches;
  }
}
