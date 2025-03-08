export type Identifier = string | number;

export interface Record<TID extends Identifier = Identifier> {
  id: TID;

  [key: string]: any;
}
