import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { EventBus } from '../../modules/shared/domain/EventBus';
import { UserDeleter } from '../../modules/users/application/UserDeleter';
import { UserFinderById } from '../../modules/users/application/UserFinderById';
import { UserRegister } from '../../modules/users/application/UserRegister';
import { UserSearchAll } from '../../modules/users/application/UsersSearchAll';
import { BcryptHasher } from '../../modules/users/infrastructure/BcryptHashing';
import { TypeOrmUserRepository } from '../../modules/users/infrastructure/persistence/typeorm/TypeOrmUserRepository';
import { UserDeleterCrontroller } from './controllers/UserDeleterController';
import { UserFinderGetCrontroller } from './controllers/UserFinderByIdGetCrontroller';
import { UserRegisterPostController } from './controllers/UserRegisterPostController';
import { UsersSearchAllGetController } from './controllers/UsersSearchAllGetController';

export function registerRouterUser(eventBus: EventBus): Router {
  const userRepository = getConnection().getCustomRepository(TypeOrmUserRepository);

  const routersUser = Router();

  const userRegister = new UserRegister(new BcryptHasher(), userRepository, eventBus);
  const userPostController = new UserRegisterPostController(userRegister);
  routersUser.post('/users', (req: Request, res: Response) => userPostController.run(req, res));

  const userFinderById = new UserFinderById(userRepository);
  const userFinderByIdController = new UserFinderGetCrontroller(userFinderById);
  routersUser.get('/users/:id', (req: Request, res: Response) => userFinderByIdController.run(req, res));

  const usersSearchAll = new UserSearchAll(userRepository);
  const userSearchAllController = new UsersSearchAllGetController(usersSearchAll);
  routersUser.get('/users/all', (req: Request, res: Response) => userSearchAllController.run(req, res));

  const userDeleter = new UserDeleter(userRepository);
  const userDeleteController = new UserDeleterCrontroller(userDeleter);
  routersUser.delete('/users/:id', (req: Request, res: Response) => userDeleteController.run(req, res));

  return routersUser;
}
