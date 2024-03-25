import {PrRecord, Id} from "./record";
import {Meta, PaginatedParams, Params} from "./variables";

/**
 * TODO:
 * - DataProvider that manipulates ressource endpoints
 * - Params<T> with pagination, it has many variant so define it elsewhere
 */
export interface DataProvider<R extends PrRecord = PrRecord> {
  getName: () => string;

  getOne: (id: Id, params?: Params, meta?: Meta) => Promise<R>;
  getMany: (params?: PaginatedParams, meta?: Meta) => Promise<R>;

  create: (record: R, params?: Params, meta?: Meta) => Promise<R>;
  createMany: (records: R[], params?: Params, meta?: Meta) => Promise<R>;

  update: (id: Id, params?: Params, meta?: Meta) => Promise<R>;
  updateMany: (records: R[], params?: Params, meta?: Meta) => Promise<R>;

  crupdate: (id: Id, record: R, params?: Params, meta?: Meta) => Promise<R>;
  crupdateMany: (records: R[], params?: Params, meta?: Meta) => Promise<R>;

  deleteOne: (id: Id, params?: Params, meta?: Meta) => Promise<R>;
  deleteMany: (ids: Id[], params?: Params, meta?: Meta) => Promise<R>;
}

class DataProviderBase implements DataProvider {
  constructor(private readonly name: string) {}

  getOne() {
    return this.unimplemented("getOne");
  }

  getMany() {
    return this.unimplemented("getMany");
  }

  create() {
    return this.unimplemented("create");
  }

  createMany() {
    return this.unimplemented("createMany");
  }

  update() {
    return this.unimplemented("update");
  }

  updateMany() {
    return this.unimplemented("updateMany");
  }

  crupdate() {
    return this.unimplemented("crupdate");
  }

  crupdateMany() {
    return this.unimplemented("crupdateMany");
  }

  deleteOne() {
    return this.unimplemented("deleteOne");
  }

  deleteMany() {
    return this.unimplemented("deleteMany");
  }

  getName() {
    return this.name;
  }

  private unimplemented(method: string): never {
    throw new Error(`${this.getName()}.${method} is not implemented.`);
  }
}

export const queries = [
  "getOne",
  "getMany",
  "create",
  "createMany",
  "update",
  "updateMany",
  "crupdate",
  "crupdateMany",
  "deleteOne",
  "deleteMany",
] as const;

/**
 * Creates a new instance of a DataProvider with a specified name and implementation.
 * This factory function allows for the flexible creation of DataProvider instances,
 * enabling the composition of different functionalities and behaviors.
 *
 * The `impl` parameter accepts a partial implementation of the DataProvider interface,
 * excluding the `getName` method, which is provided by the factory function itself.
 *
 * Usage:
 *
 * const exampleDataProvider = createDataProvider('exampleDataProvider', {
 *   getOne: (id, params, meta) => { /* impl `*\/` },
 *   // other methods...
 * });
 *
 * @param name - The name of the data provider instance.
 * @param impl - A partial implementation of the DataProvider interface
 * @returns A new instance of DataProvider
 */
export function createDataProvider<R extends PrRecord = PrRecord>(
  name: string,
  impl: Partial<Omit<DataProvider<R>, "getName">> = {}
): DataProvider<R> {
  const providerBase = new DataProviderBase(name);
  const dataProvider = Object.assign({}, impl, {getName: () => name});
  return Object.setPrototypeOf(dataProvider, providerBase);
}
