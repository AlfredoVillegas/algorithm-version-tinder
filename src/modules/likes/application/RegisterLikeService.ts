import { EventBus } from '../../shared/domain/EventBus';
import { Uuid } from '../../shared/domain/Uuid';
import { Likes } from '../domain/Likes';
import { LikesRepository } from '../domain/LikesRepository';
import { VerifyIfLikesIsMutual } from '../domain/VerifyIfLikeIsMutual';

export class RegisterLikeService {
  private verifyIfLikeIsMutual: VerifyIfLikesIsMutual;

  constructor(private repository: LikesRepository, private eventBus: EventBus) {
    this.verifyIfLikeIsMutual = new VerifyIfLikesIsMutual(repository);
  }

  public async execute(fromUser: string, toUser: string): Promise<void> {
    const fromUserId = new Uuid(fromUser);
    const toUserId = new Uuid(toUser);

    if (await this.LikeAlreadyExists(fromUserId, toUserId)) {
      return;
    }

    const like = Likes.registerLike(fromUserId, toUserId);
    await this.repository.save(like);

    const likesMutualEvent = await this.verifyIfLikeIsMutual.execute(toUserId, fromUserId);
    if (likesMutualEvent) {
      await this.eventBus.publish([likesMutualEvent]);
    }
  }

  private async LikeAlreadyExists(fromUserId: Uuid, toUserId: Uuid) {
    return await this.repository.findLikeBetween(fromUserId, toUserId);
  }
}
