import { EntitySchema } from 'typeorm';
import { DateTransformerOrm } from '../../../../shared/infrastructure/percistence/typeorm/DateTransformerOrm';
import { UuidTransformerOrm } from '../../../../shared/infrastructure/percistence/typeorm/UuidTransformerOrm';
import { Likes } from '../../../domain/Likes';

export const LikeSchema = new EntitySchema<Likes>({
  name: 'Likes',
  tableName: 'likes',
  target: Likes,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: UuidTransformerOrm
    },
    fromUser: {
      type: String,
      transformer: UuidTransformerOrm
    },
    toUser: {
      type: String,
      transformer: UuidTransformerOrm
    },
    createdAt: {
      type: String,
      transformer: DateTransformerOrm
    }
  }
});
