import { EntitySchema } from 'typeorm';
import { DateTransformerOrm } from '../../../../shared/infrastructure/percistence/typeorm/DateTransformerOrm';
import { UuidTransformerOrm } from '../../../../shared/infrastructure/percistence/typeorm/UuidTransformerOrm';
import { Matches } from '../../../domain/Matches';

export const MatchesSchema = new EntitySchema<Matches>({
  name: 'Matches',
  tableName: 'matches',
  target: Matches,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: UuidTransformerOrm
    },
    personOne: {
      type: String,
      transformer: UuidTransformerOrm
    },
    personTwo: {
      type: String,
      transformer: UuidTransformerOrm
    },
    createdAt: {
      type: String,
      transformer: DateTransformerOrm
    }
  }
});
