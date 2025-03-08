import {HttpError} from "@provida/core";
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
    const {response} = error;
    console.assert(response?.status != null, "%s should always be transmitted.", response?.status);
    return new HttpError(
      error.message,
      response?.status || 520 /* Unknown Error */,
      error.response?.data || error.message
    );
  }
  return error;
};
