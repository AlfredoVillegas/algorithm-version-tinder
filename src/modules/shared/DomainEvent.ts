import { Uuid } from './Uuid';

export abstract class DomainEvent {
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: Uuid, eventId?: string, occurredOn?: Date) {
    this.eventId = eventId || Uuid.random().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }
}
