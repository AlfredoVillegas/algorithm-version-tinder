import { Likes } from './Likes';

export interface LikesRepository {
  save(likes: Likes): Promise<void>;

  searchLikesFrom(fromUser: string): Promise<Likes[] | undefined | null>;

  findLikeBetween(fromUser: string, whitUser: string): Promise<Likes | undefined | null>;
}
