import { Application } from 'express';

import { registerAuthRouters } from './auth.route';

export function initRouterAuth(app: Application) {
  app.use('/api', registerAuthRouters());
}
