import { DomainEvent } from '../../shared/DomainEvent';

export class LikingIsMutualDomainEvent extends DomainEvent {
  static EVENT_NAME = 'liking.is.mutual';
  readonly couple: string[];
  constructor(couple: string[]) {
    super(LikingIsMutualDomainEvent.EVENT_NAME);
    this.couple = couple;
  }
}
