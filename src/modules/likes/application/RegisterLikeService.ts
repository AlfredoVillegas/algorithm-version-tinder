import { EventBus } from '../../shared/domain/EventBus';
import { Likes } from '../domain/Likes';
import { LikesRepository } from '../domain/LikesRepository';
import { VerifyIfLikesIsMutual } from '../domain/VerifyIfLikeIsMutual';

class RegisterLikeService {
  private verifyIfLikeIsMutualService: VerifyIfLikesIsMutual;

  constructor(private repository: LikesRepository, private eventBus: EventBus) {
    this.verifyIfLikeIsMutualService = new VerifyIfLikesIsMutual(repository);
  }

  public async execute(fromUser: string, toUser: string): Promise<void> {
    const like = Likes.registerLike(fromUser, toUser);

    const likesMutualEvent = await this.verifyIfLikeIsMutualService.execute(toUser, fromUser);

    await this.repository.save(like);

    if (likesMutualEvent) {
      this.eventBus.publish([likesMutualEvent]);
    }
  }
}
