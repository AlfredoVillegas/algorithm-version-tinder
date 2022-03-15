import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { FinderMatchesByUser } from '../../modules/matches/application/FinderMatchesByUser';
import { TypeOrmMatchesRepository } from '../../modules/matches/infrastructure/persistence/typeorm/TypeOrmMatchesRepository';
import { FinderMatchesByUserController } from './controller/FinderMatchesByUserController';

export function registerRouterMatches(): Router {
  const matchesRepository = getConnection().getCustomRepository(TypeOrmMatchesRepository);

  const routersMatches = Router();

  const finderMatchesByUser = new FinderMatchesByUser(matchesRepository);
  const finderFromUserController = new FinderMatchesByUserController(finderMatchesByUser);
  routersMatches.get('/matches/:userId', (req: Request, res: Response) => finderFromUserController.run(req, res));

  return routersMatches;
}
