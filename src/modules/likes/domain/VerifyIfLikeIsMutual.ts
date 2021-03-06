import { Uuid } from '../../shared/domain/Uuid';
import { LikesMutualArchievedDomainEvent } from './LikesMutualArchievedDomainEvent';
import { LikesRepository } from './LikesRepository';

export class VerifyIfLikesIsMutual {
  constructor(private repository: LikesRepository) {}

  public async execute(fromUser: Uuid, whitUser: Uuid): Promise<LikesMutualArchievedDomainEvent | null> {
    const like = await this.repository.findLikeBetween(fromUser, whitUser);
    if (!like) {
      return null;
    }
    return new LikesMutualArchievedDomainEvent([fromUser.toString(), whitUser.toString()]);
  }
}
