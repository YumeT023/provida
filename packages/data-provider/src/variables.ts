import {Pagination} from "./pagination";

export type Meta = Record<string|number|symbol, any>;

export type Params<T extends {} = {}> = T & Record<string, any>

export type PaginatedParams<T extends {} = {}> = T & {
  page: Pagination;
  [key: string]: any;
}
