import { Uuid } from '../../shared/domain/Uuid';

export class Likes {
  readonly id: Uuid;
  readonly fromUser: Uuid;
  readonly toUser: Uuid;
  readonly date: Date;

  constructor(id: Uuid, fromUser: Uuid, toUser: Uuid, date: Date) {
    this.id = id;
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.date = date;
  }

  static registerLike(fromUser: Uuid, toUser: Uuid): Likes {
    const id = Uuid.random();

    const likes = new Likes(id, fromUser, toUser, new Date());
    return likes;
  }
}
