import { EntityManager, EntityRepository } from 'typeorm';
import { Uuid } from '../../../../shared/domain/Uuid';
import { Likes } from '../../../domain/Likes';
import { LikesRepository } from '../../../domain/LikesRepository';
import { LikeSchema } from './LikeSchema';

@EntityRepository()
export class TypeOrmLikesRepository implements LikesRepository {
  constructor(private manager: EntityManager) {}

  async save(Likes: Likes): Promise<void> {
    await this.manager.save(LikeSchema, Likes);
  }
  async searchLikesFrom(fromUser: Uuid): Promise<Likes[] | null | undefined> {
    const LikesInDb = await this.manager.find(LikeSchema, {
      fromUser: fromUser
    });

    return LikesInDb;
  }
  async findLikeBetween(fromUser: Uuid, whitUser: Uuid): Promise<Likes | null | undefined> {
    const LikeInDb = await this.manager.findOne(LikeSchema, {
      fromUser: fromUser,
      toUser: whitUser
    });

    return LikeInDb;
  }
}
