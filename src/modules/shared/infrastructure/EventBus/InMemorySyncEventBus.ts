import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';
import { EventBus } from '../../domain/EventBus';

export class InMemorySyncEventBus implements EventBus {
  private subscribersMap: Map<string, DomainEventSubscriber[]>;

  constructor() {
    this.subscribersMap = new Map();
  }

  public addSubscribe(subscribers: DomainEventSubscriber[]): void {
    subscribers.forEach(subscriber => {
      const eventsNames = subscriber.susbcribedTo();
      eventsNames.map(eventName => this.subscribe(eventName, subscriber));
    });
  }

  private subscribe(eventName: string, subscriber: DomainEventSubscriber): void {
    const eventsRegistered = this.subscribersMap.get(eventName);
    if (eventsRegistered) {
      eventsRegistered.push(subscriber);
      this.subscribersMap.set(eventName, eventsRegistered);
    } else {
      this.subscribersMap.set(eventName, [subscriber]);
    }
  }

  public async publish(events: DomainEvent[]): Promise<void> {
    for (let event of events) {
      const subscribers = this.subscribersMap.get(event.eventName);
      if (subscribers) {
        subscribers.map(subcriber => subcriber.receive(event));
      }
    }
  }
}
