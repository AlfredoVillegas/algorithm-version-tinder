import { createConnection } from 'typeorm';
import { InMemorySyncEventBus } from '../modules/shared/infrastructure/EventBus/InMemorySyncEventBus';
import { Server } from './server';

(async () => {
  console.log('Init: connection of TypeOrm for api');
  await createConnection();

  console.log('Init: EventBuss');
  const eventBus = new InMemorySyncEventBus();

  //console.log('register Events Subscribers');

  console.log('Init: Server...');
  const server = new Server(eventBus);
  server.listen();
})();
