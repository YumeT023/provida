import type {Pagination} from "./pagination";
import type {Dict} from "./types";

export type Meta = Record<string | number | symbol, any>;

export type Params<T extends object = object> = T & Dict;

export type PaginatedParams<T extends object = object> = Params<T & Pagination>;
