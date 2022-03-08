import { Matches } from '../domain/Matches';
import { MatchesRepository } from '../domain/MatchesRepository';

export class MatchesCreatorService {
  constructor(private repository: MatchesRepository) {}
  async execute(personOne: string, personTwo: string): Promise<void> {
    const matches = Matches.Create(personOne, personTwo);

    await this.repository.save(matches);
  }
}
