import { EventBus } from '../../shared/domain/EventBus';
import { Likes } from '../domain/Likes';
import { LikesRepository } from '../domain/LikesRepository';
import { VerifyIfLikesIsMutual } from '../domain/VerifyIfLikeIsMutual';

class RegisterLikeService {
  private verifyIfLikeIsMutual: VerifyIfLikesIsMutual;

  constructor(private repository: LikesRepository, private eventBus: EventBus) {
    this.verifyIfLikeIsMutual = new VerifyIfLikesIsMutual(repository);
  }

  public async execute(fromUser: string, toUser: string): Promise<void> {
    const like = Likes.registerLike(fromUser, toUser);
    await this.repository.save(like);

    const likesMutualEvent = await this.verifyIfLikeIsMutual.execute(toUser, fromUser);
    if (likesMutualEvent) {
      await this.eventBus.publish([likesMutualEvent]);
    }
  }
}
