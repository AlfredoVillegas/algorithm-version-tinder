import { Application } from 'express';
import { initSubscribersEventsMatches } from './EventSubscribe';
import { registerRouterMatches } from './matches.route';

export function initRouterMatches(app: Application) {
  app.use('/api', registerRouterMatches());
}
