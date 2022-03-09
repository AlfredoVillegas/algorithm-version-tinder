import { EntityManager, EntityRepository } from 'typeorm';
import { Uuid } from '../../../../shared/domain/Uuid';
import { Matches } from '../../../domain/Matches';
import { MatchesRepository } from '../../../domain/MatchesRepository';
import { MatchesSchema } from './MatchesSchema';

@EntityRepository()
export class TypeOrmMatchesRepository implements MatchesRepository {
  constructor(private manager: EntityManager) {}

  async save(matches: Matches): Promise<void> {
    await this.manager.save(MatchesSchema, matches);
  }
  async findByUser(user: Uuid): Promise<Matches | null | undefined> {
    const findInDb = await this.manager.findOne(MatchesSchema, {
      where: [{ personOne: user }, { personTwo: user }]
    });

    return findInDb;
  }
  async findMatchesByUser(user: Uuid): Promise<Matches[] | null | undefined> {
    const findInDb = await this.manager.find(MatchesSchema, {
      where: [{ personOne: user }, { personTwo: user }]
    });

    return findInDb;
  }
}
