import { Uuid } from '../../../domain/Uuid';

export const UuidTransformerOrm = {
  from: (value: string): Uuid => new Uuid(value),
  to: (value: Uuid): string => value.value
};
