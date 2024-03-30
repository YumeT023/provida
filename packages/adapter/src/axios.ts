import {HttpError} from "@provida/core";
import {AxiosResponse, isAxiosError} from "axios";
import {QueryAdapter} from "./types";

export type AxiosQueryAdapter = QueryAdapter<AxiosResponse>;

export const axios: AxiosQueryAdapter = async (query) => {
  try {
    const res = await query();
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new HttpError(err.message, err.status ?? 500, err.cause?.message);
    }
    throw err;
  }
};
