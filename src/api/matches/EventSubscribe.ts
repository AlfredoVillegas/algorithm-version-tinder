import { getConnection } from 'typeorm';
import { CreateMatchesOnLikesMutualArchieved } from '../../modules/matches/application/CreateMatches/CreateMatchesOnLikesMutualArchieved';
import { MatchesCreatorService } from '../../modules/matches/application/CreateMatches/MatchesCreatorService';
import { TypeOrmMatchesRepository } from '../../modules/matches/infrastructure/persistence/typeorm/TypeOrmMatchesRepository';
import { EventBus } from '../../modules/shared/domain/EventBus';

export function initSubscribersEventsMatches(eventBus: EventBus) {
  const repository = getConnection().getCustomRepository(TypeOrmMatchesRepository);

  const matchesCreator = new MatchesCreatorService(repository);
  const matchesCreatorSubcriber = new CreateMatchesOnLikesMutualArchieved(matchesCreator);

  eventBus.addSubscribe([matchesCreatorSubcriber]);
}
