import { Uuid } from '../../shared/domain/Uuid';
import { Matches } from './Matches';

export interface MatchesRepository {
  save(matches: Matches): Promise<void>;
  findMatchesByUser(user: Uuid): Promise<Matches[] | null | undefined>;
}
