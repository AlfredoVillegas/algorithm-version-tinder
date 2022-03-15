import { Application } from 'express';
import { EventBus } from '../../modules/shared/domain/EventBus';
import { registerRouterLikes } from './likes.route';

export function initRouterLikes(app: Application, eventBus: EventBus) {
  app.use('/api', registerRouterLikes(eventBus));
}
