export const DateTransformerOrm = {
  from: (value: string): Date => new Date(value),
  to: (value: Date): string => value.toString()
};
