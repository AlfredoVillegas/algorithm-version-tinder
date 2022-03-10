import { Uuid } from '../../shared/domain/Uuid';
import { Likes } from './Likes';

export interface LikesRepository {
  save(likes: Likes): Promise<void>;

  searchLikesFrom(fromUser: Uuid): Promise<Likes[] | undefined | null>;

  findLikeBetween(fromUser: Uuid, whitUser: Uuid): Promise<Likes | undefined | null>;
}
