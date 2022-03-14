import { Request, Response, Router } from 'express';
import { loginPostController } from './LoginPostController';

export function registerAuthRouters(): Router {
  const routersAuth = Router();

  routersAuth.post('/auth/login', (req: Request, res: Response) => loginPostController(req, res));

  return routersAuth;
}
