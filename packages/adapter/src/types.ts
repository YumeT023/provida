export type AdapterQueryCallback<TBase> = <R extends TBase>() => Promise<R>;

export type QueryAdapter<TQueryFnReturn> = <TAdapterReturn>(
  q: AdapterQueryCallback<TQueryFnReturn>
) => Promise<TAdapterReturn>;
