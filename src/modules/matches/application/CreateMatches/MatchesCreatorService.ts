import { Uuid } from '../../../shared/domain/Uuid';
import { Matches } from '../../domain/Matches';
import { MatchesRepository } from '../../domain/MatchesRepository';

export class MatchesCreatorService {
  constructor(private repository: MatchesRepository) {}
  async execute(personOne: string, personTwo: string): Promise<void> {
    const matches = Matches.Create(new Uuid(personOne), new Uuid(personTwo));

    await this.repository.save(matches);
  }
}
