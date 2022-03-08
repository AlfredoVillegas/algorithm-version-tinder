import { DomainEvent } from '../../shared/domain/DomainEvent';

export class LikesMutualArchievedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'likes.mutual.archieved';
  readonly couple: string[];
  constructor(couple: string[]) {
    super(LikesMutualArchievedDomainEvent.EVENT_NAME);
    this.couple = couple;
  }
}
