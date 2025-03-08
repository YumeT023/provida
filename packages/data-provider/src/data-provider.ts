import type {Record} from "./record";
import type {Meta, PaginatedParams, Params} from "./variables";

/**
 * TODO:
 * - DataProvider that manipulates ressource endpoints
 * - Params<T> with pagination, it has many variant so define it elsewhere
 */
export interface DataProvider<RecordType extends Record = Record> {
  getName: () => string;

  getOne: (id: RecordType["id"], params?: Params, meta?: Meta) => Promise<RecordType>;
  getMany: (params?: PaginatedParams, meta?: Meta) => Promise<RecordType[]>;

  create: (record: RecordType, params?: Params, meta?: Meta) => Promise<RecordType>;
  createMany: (records: RecordType[], params?: Params, meta?: Meta) => Promise<RecordType[] | void>;

  update: (id: RecordType["id"], params?: Params, meta?: Meta) => Promise<RecordType>;
  updateMany: (records: RecordType[], params?: Params, meta?: Meta) => Promise<RecordType[] | void>;

  crupdate: (
    id: RecordType["id"],
    record: RecordType,
    params?: Params,
    meta?: Meta
  ) => Promise<RecordType>;

  crupdateMany: (
    records: RecordType[],
    params?: Params,
    meta?: Meta
  ) => Promise<RecordType[] | void>;

  deleteOne: (id: RecordType["id"], params?: Params, meta?: Meta) => Promise<RecordType>;

  deleteMany: (
    ids: RecordType["id"][],
    params?: Params,
    meta?: Meta
  ) => Promise<RecordType[] | void>;
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
 * @param impl - A partial/full implementation of the DataProvider interface
 * @returns A new instance of DataProvider
 */
export function createDataProvider<RecordType extends Record = Record>(
  name: string,
  impl: Partial<Omit<DataProvider<RecordType>, "getName">> = {}
): DataProvider<RecordType> {
  const providerBase = new DataProviderBase(name);
  const dataProvider = Object.assign({}, impl, {getName: () => name});
  return Object.setPrototypeOf(dataProvider, providerBase);
}
