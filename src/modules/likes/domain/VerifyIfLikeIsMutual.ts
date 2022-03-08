import { LikesRepository } from './LikesRepository';
import { LikingIsMutualDomainEvent } from './LikingIsMutualDomainEvent';

export class VerifyIfLikesIsMutual {
  constructor(private repository: LikesRepository) {}

  public async execute(fromUser: string, whitUser: string): Promise<LikingIsMutualDomainEvent | null> {
    const likes = await this.repository.findLikeBetween(fromUser, whitUser);
    if (!likes) {
      return null;
    }
    return new LikingIsMutualDomainEvent([fromUser, whitUser]);
  }
}
