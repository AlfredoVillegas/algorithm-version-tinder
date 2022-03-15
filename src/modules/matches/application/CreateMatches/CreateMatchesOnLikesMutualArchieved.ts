import { LikesMutualArchievedDomainEvent } from '../../../likes/domain/LikesMutualArchievedDomainEvent';
import { DomainEventSubscriber } from '../../../shared/domain/DomainEventSubscriber';
import { MatchesCreatorService } from './MatchesCreatorService';

export class CreateMatchesOnLikesMutualArchieved implements DomainEventSubscriber {
  constructor(private matchesCreator: MatchesCreatorService) {}

  async receive(domainEvent: LikesMutualArchievedDomainEvent): Promise<void> {
    const personOne = domainEvent.couple[0];
    const personTow = domainEvent.couple[1];
    await this.matchesCreator.execute(personOne, personTow);
  }
  susbcribedTo(): string[] {
    return [LikesMutualArchievedDomainEvent.EVENT_NAME];
  }
}
