import { createConnection, getConnection } from 'typeorm';
import { Matches } from '../modules/matches/domain/Matches';
import { TypeOrmMatchesRepository } from '../modules/matches/infrastructure/persistence/typeorm/TypeOrmMatchesRepository';
import { Uuid } from '../modules/shared/domain/Uuid';

(async () => {
  console.log('/CreandoConex......');
  await createConnection();
  console.log('/TraerReopositoy........');
  const repo = getConnection().getCustomRepository(TypeOrmMatchesRepository);
  console.log('/conexLista.');
  const userId2 = Uuid.random().toString();
  console.log('/guradando');
  await repo.save(Matches.Create('2f3288d5-b69c-4fe6-aa92-7913ed89b3cf', userId2));
  console.log('/n');
  console.log('/buscando');
  const traer = await repo.findMatchesByUser(new Uuid('2f3288d5-b69c-4fe6-aa92-7913ed89b3cf'));
  console.log('/busclistp');
  console.log('este:');
  console.log(traer);
})();
