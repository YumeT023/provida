import type {DataProvider, QName} from "@provida/data-provider";

export type QueryArgs<N extends QName> = Parameters<DataProvider[N]>;
export type QueryReturn<N extends QName> = ReturnType<DataProvider[N]>;

export type MiddlewareQueryFn<N extends QName, R = unknown> = (...args: QueryArgs<N>) => Promise<R>;

export type Middleware<R = unknown> = <N extends QName>(
  q: MiddlewareQueryFn<N, R>,
) => MiddlewareQueryFn<N, QueryReturn<N>>;

