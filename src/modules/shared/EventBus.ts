import { DomainEvent } from './DomainEvent';
import { DomainEventSubscriber } from './DomainEventSubscriber';

export interface EventBus {
  addSubscribe(subscriber: DomainEventSubscriber[]): void;
  publish(events: DomainEvent[]): void;
}
