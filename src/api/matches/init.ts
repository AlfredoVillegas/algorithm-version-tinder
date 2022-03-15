import { Application } from 'express';
import { registerRouterMatches } from './matches.route';

export function initRouterMatches(app: Application) {
  app.use('/api', registerRouterMatches());
}
