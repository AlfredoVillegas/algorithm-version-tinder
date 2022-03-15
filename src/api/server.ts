import cors from 'cors';
import express, { Application } from 'express';
import { EventBus } from '../modules/shared/domain/EventBus';
import { initRouterAuth } from './auth/init';
import { initRouterLikes } from './likes/init';
import { initRouterMatches } from './matches/init';
import { initRouterUsers } from './users/init';

export class Server {
  private app: Application;
  private port: string;
  private eventBus: EventBus;
  readonly apiPath = '/api';

  constructor(eventBus: EventBus) {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.eventBus = eventBus;
    this.middlewares();
    this.initRoutes();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  initRoutes() {
    initRouterAuth(this.app);
    initRouterUsers(this.app, this.eventBus);
    initRouterLikes(this.app, this.eventBus);
    initRouterMatches(this.app);
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at http://localhost:${this.port}${this.apiPath} `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}
