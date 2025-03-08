import {type AxiosResponse, isAxiosError} from "axios";
import type {InferAxiosResponseData} from "./types";

export const axios = async (
  promise: Promise<AxiosResponse<any>>
): Promise<InferAxiosResponseData<Awaited<typeof promise>>> => {
  try {
    return (await promise).data;
  } catch (e: unknown) {
    throw normalizeAxiosError(e);
  }
};

const normalizeAxiosError = (error: any) => {
  if (error && isAxiosError(error)) {
    const {response, config} = error;
    return {
      ...response?.data,
      status: response?.status,
      response,
      config,
    };
  }
  return error;
};
