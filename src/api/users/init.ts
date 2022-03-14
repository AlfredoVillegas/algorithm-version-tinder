import { Application } from 'express';
import { EventBus } from '../../modules/shared/domain/EventBus';
import { registerRouterUser } from './users.route';

export function initRouterUsers(app: Application, eventBus: EventBus) {
  app.use('/api', registerRouterUser(eventBus));
}
