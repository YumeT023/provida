import type {AxiosResponse} from "axios";

export type InferAxiosResponseData<Res extends AxiosResponse<any>> =
  Res extends AxiosResponse<infer TData> ? TData : never;
