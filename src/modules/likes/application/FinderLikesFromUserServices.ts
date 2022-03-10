import { Uuid } from '../../shared/domain/Uuid';
import { Likes } from '../domain/Likes';
import { LikesRepository } from '../domain/LikesRepository';

export class FinderLikesByUserServices {
  constructor(private repository: LikesRepository) {}

  public async execute(fromUser: string): Promise<Likes[]> {
    const likes = await this.repository.searchLikesFrom(new Uuid(fromUser));
    if (!likes) {
      throw new Error(`this user : ${fromUser} has not given likes`);
    }
    return likes;
  }
}
