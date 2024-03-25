export interface PrRecord {
  id: string | number;
  [key: string]: any;
}

export type Id = PrRecord["id"];
