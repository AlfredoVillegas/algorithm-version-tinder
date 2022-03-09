import { Uuid } from '../../shared/domain/Uuid';
import { Matches } from '../domain/Matches';
import { MatchesRepository } from '../domain/MatchesRepository';

export class FinderMatchesByUser {
  constructor(private repository: MatchesRepository) {}
  async execute(user: string): Promise<Matches[]> {
    const matches = await this.repository.findMatchesByUser(new Uuid(user));

    if (!matches) {
      throw new Error(`this user : ${user} not have Matches`);
    }

    return matches;
  }
}
