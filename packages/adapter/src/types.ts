export type AdapterQueryCallback<TBase> = <R extends TBase>() => Promise<R>;

export type QueryAdapter<TQueryFnReturn extends object> = <TAdapterReturn extends object>(
  q: AdapterQueryCallback<TQueryFnReturn>
) => Promise<TAdapterReturn>;
