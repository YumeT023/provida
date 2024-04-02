import {createDataProvider} from "@provida/data-provider";
import {HttpError} from "@provida/core";
import axios from "axios";
import {describe, beforeAll, afterAll, afterEach, test, expect} from "vitest";
import {
  Foo,
  createInterceptorMatchUrl,
  createInterceptorServer,
  expectedBadRequestBody,
  expectedFoos,
} from "./util";
import adapter from "../src";

const server = createInterceptorServer();

describe("adapter: axios", () => {
  const fooProvider = createDataProvider<Foo>("__tests__", {
    getMany: () =>
      adapter.axios(() => {
        return axios.get(createInterceptorMatchUrl("foos"));
      }),
    updateMany: () =>
      adapter.axios(() => {
        return axios.put(createInterceptorMatchUrl("foos"), {});
      }),
  });

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test("unwraps AxiosResponse<TData> correctly", async () => {
    const data = await fooProvider.getMany();
    expect(data).to.deep.eq(expectedFoos);
  });

  test("transforms AxiosError to provida/core::HttpError on exception", async () => {
    const expectedErr = new HttpError(
      "Request failed with status code 403",
      403,
      expectedBadRequestBody
    );
    try {
      await fooProvider.updateMany([]);
    } catch (e) {
      expect(e).to.deep.eq(expectedErr);
    }
  });
});
