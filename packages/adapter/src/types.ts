export type AdapterQueryCallback<TBase> = <R extends TBase>() => Promise<R>;

export type QueryAdapter<TQueryFnReturn extends {}> = <TAdapterReturn extends {}>(
  q: AdapterQueryCallback<TQueryFnReturn>
) => Promise<TAdapterReturn>;
