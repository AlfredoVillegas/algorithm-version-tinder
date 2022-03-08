import { DomainEvent } from './DomainEvent';

export interface DomainEventSubscriber {
  receive(domainEvent: DomainEvent): void;
  susbcribedTo(): DomainEvent['eventName'][];
}
