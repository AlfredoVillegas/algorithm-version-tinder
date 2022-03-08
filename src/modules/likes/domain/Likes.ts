import { Uuid } from '../../shared/Uuid';

export class Likes {
  readonly id: Uuid;
  readonly fromUser: string;
  readonly toUser: string;
  readonly date: Date;

  constructor(id: string, fromUser: string, toUser: string, date: Date) {
    this.id = new Uuid(id);
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.date = date;
  }

  static registerLike(fromUser: string, toUser: string): Likes {
    const id = Uuid.random().value;
    const likes = new Likes(id, fromUser, toUser, new Date());
    return likes;
  }
}
