import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { FinderLikesByUserServices } from '../../modules/likes/application/FinderLikesFromUserServices';
import { RegisterLikeService } from '../../modules/likes/application/RegisterLikeService';
import { TypeOrmLikesRepository } from '../../modules/likes/infrastructure/persistence/typeorm/TypeOrmLikesRepository';
import { EventBus } from '../../modules/shared/domain/EventBus';
import { FinderLikesFromUserController } from './controllers/FinderLikesFromUserController';
import { RegisterLikePostControler } from './controllers/RegisterLikePostController';

export function registerRouterLikes(eventBus: EventBus): Router {
  const likesRepository = getConnection().getCustomRepository(TypeOrmLikesRepository);

  const routersLike = Router();

  const likesRegister = new RegisterLikeService(likesRepository, eventBus);
  const likesPostController = new RegisterLikePostControler(likesRegister);
  routersLike.post('/likes', (req: Request, res: Response) => likesPostController.run(req, res));

  const finderLikesFromUser = new FinderLikesByUserServices(likesRepository);
  const finderFromUserController = new FinderLikesFromUserController(finderLikesFromUser);
  routersLike.get('/likes/:userId', (req: Request, res: Response) => finderFromUserController.run(req, res));

  return routersLike;
}
