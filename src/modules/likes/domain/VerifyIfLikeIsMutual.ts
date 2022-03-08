import { LikesMutualArchievedDomainEvent } from './LikesMutualArchievedDomainEvent';
import { LikesRepository } from './LikesRepository';

export class VerifyIfLikesIsMutual {
  constructor(private repository: LikesRepository) {}

  public async execute(fromUser: string, whitUser: string): Promise<LikesMutualArchievedDomainEvent | null> {
    const likes = await this.repository.findLikeBetween(fromUser, whitUser);
    if (!likes) {
      return null;
    }
    return new LikesMutualArchievedDomainEvent([fromUser, whitUser]);
  }
}
