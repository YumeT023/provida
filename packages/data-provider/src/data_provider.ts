import {PrRecord, Id} from "./record";
import {Meta, PaginatedParams, Params} from "./variables";

/**
 * TODO:
 * - DataProvider that manipulates ressource endpoints
 * - Params<T> with pagination, it has many variant so define it elsewhere
 */
export interface DataProvider<R extends PrRecord = PrRecord> {
  getOne: (id: Id, params: Params, meta?: Meta) => Promise<R>;
  getMany: (params: PaginatedParams, meta?: Meta) => Promise<R>;

  create: (record: R, params: Params, meta?: Meta) => Promise<R>;
  createMany: (records: R[], params: Params, meta?: Meta) => Promise<R>;

  update: (id: Id, params: Params, meta: Meta) => Promise<R>;
  updateMany: (records: R[], params: Params, meta?: Meta) => Promise<R>;

  crupdate: (id: Id, record: R, params: Params, meta?: Meta) => Promise<R>;
  crupdateMany: (records: R[], params: Params, meta?: Meta) => Promise<R>;

  deleteOne: (id: Id, params: Params, meta?: Meta) => Promise<R>;
  deleteMany: (ids: Id[], params: Params, meta?: Meta) => Promise<R>;
}
